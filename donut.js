// Inicialización de variables para los ángulos A y B, y el objeto Math
let angleA = 0, angleB = 0;
const M = Math;

// Obtener el elemento canvas del HTML y su contexto de dibujo 2D
const canvas = document.getElementById('asciiCanvas');
const ctx = canvas.getContext('2d');

// Establecer el tamaño del canvas para la animación (80 columnas x 22 filas de caracteres)
canvas.width = 640; // Tamaño basado en 80 columnas (80 * 8 pixels por carácter)
canvas.height = 352; // Tamaño basado en 22 filas (22 * 16 pixels por carácter)

// Función principal que genera cada frame de la animación ASCII
var asciiframe = function () {
  // Arreglos para almacenar los caracteres del frame y la profundidad
  var chars = []; // Array que almacena los caracteres
  var depths = []; // Array que almacena la profundidad del Factor

  // Incrementar los ángulos A y B para la animación
  angleA += 0.07;
  angleB += 0.03;

  // Calcular Coseno y Seno de los ángulos A y B
  var cosA = M.cos(angleA), sinA = M.sin(angleA); 
  var cosB = M.cos(angleB), sinB = M.sin(angleB); 

  // Inicializar los arreglos chars y depths
  for (var k = 0; k < 1760; k++) {
    chars[k] = ' '; // Inicializar cada posición con un espacio en blanco
    depths[k] = 0;   // Inicializar la profundidad en 0
  }

  // Primer bucle para iterar sobre el ángulo horizontal (j)
  for (var j = 0; j < 6.28; j += 0.07) { // 6.28 radianes es aproximadamente 2π

    // Variables que almacenan el Coseno (cosJ) y Seno (sinJ) del ángulo horizontal 'j'
    var cosJ = M.cos(j), sinJ = M.sin(j); 

    // Segundo bucle para iterar sobre el ángulo vertical (i)
    for (var i = 0; i < 6.28; i += 0.02) {

      // Variables que almacenan el Seno (sinI) y Coseno (cosI) del ángulo vertical 'i'
      var sinI = M.sin(i), cosI = M.cos(i);
      var heightOffset = cosJ + 2; // Desplazamiento de altura
      var depthFactor = 1 / (sinI * heightOffset * sinA + sinJ * cosA + 5); // Factor de profundidad 
      var tgValue = sinI * heightOffset * cosA - sinJ * sinA; // Valor de la tangente

      // Calcular las coordenadas X e Y ajustadas para el canvas
      var x = 0 | (40 + 30 * depthFactor * (cosI * heightOffset * cosB - tgValue * sinB));
      var y = 0 | (12 + 15 * depthFactor * (cosI * heightOffset * sinB + tgValue * cosB));

      // Calcular el índice del arreglo chars para almacenar el carácter
      var o = x + 80 * y;

      // Calcular el índice para seleccionar el carácter en el string ".,-~:;=!*#$@"
      var N = 0 | (8 * ((sinJ * sinA - sinI * cosJ * cosA) * cosB - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB));

      // Verificar si la posición está dentro del canvas y si el carácter actual tiene mayor profundidad
      if (y < 22 && y >= 0 && x >= 0 && x < 80 && depthFactor > depths[o]) {
        depths[o] = depthFactor; // Actualizar la profundidad en el arreglo depths
        chars[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0]; // Asignar el carácter correspondiente
      }
    }
  }

  // Limpiar el canvas antes de dibujar el nuevo frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Establecer el tamaño y color de la fuente para los caracteres
  ctx.font = "14px monospace"; // Tamaño de la fuente basado en el tamaño del canvas
  ctx.fillStyle = "#ffffff"; // Color blanco para los caracteres

  // Iterar sobre las filas del canvas
  for (var y = 0; y < 22; y++) {
    // Iterar sobre las columnas del canvas
    for (var x = 0; x < 80; x++) {
      // Dibujar el carácter almacenado en chars[x + y * 80] en la posición ajustada
      ctx.fillText(chars[x + y * 80], x * 8, y * 16);
    }
  }
};

// Declarar la variable del temporizador para la animación
var timer;

// Función para iniciar o detener la animación
var animation = function () {
  if (timer === undefined) {
    timer = setInterval(asciiframe, 50); // Iniciar la animación cada 50 milisegundos
  } else {
    clearInterval(timer); // Detener la animación si ya está corriendo
    timer = undefined; // Restablecer la variable del temporizador
  }
};

// Iniciar la animación al cargar la página
animation();