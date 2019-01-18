// webGL


// HTML пердоставляет тег <canvas>
// JS описывает логику
// GLSL -- язык шейдеров


// - шейдеры

// вершинный шейдер
// векторная модель сост из точек
const VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`;

// фрагментный шейдер
// отрисовка точек в опр месте
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

// рисует красную точку (пиксель) в центре сцены
function main() {
  const gl = document.getElementById('webgl').getContext('webgl');
  const vShader = gl.createShader(gl.VERTEX_SHADER);
  
  gl.shaderSource(vShader, VSHADER_SOURCE);
  gl.compileShader(vShader);
  
  const fSHader = gl.createShader(gl.FRAGMENT_SHADER);
  
  gl.shaderSource(fSHader, FSHADER_SOURCE);
  gl.compileShader(fSHader);
  gl.program = gl.createProgram();
  gl.attachShaedr(gl.program, vShader);
  gl.attachShaedr(gl.program, fShader);
  gl.linkProgram(gl.program);
  gl.useProgram(gl.program);
  gl.drawArrays(gl.POINTS, 0, 1);
}


// - three.js
// https://threejs.org/

Player = {
  init: function () {
    const container = document.getElementsByClassName('webgl')[0];
    const ratio = container.offsetWidth / container.offsetHeight;
    
    // добавляет в глобальную обл видимости для отладки
    window.scene = this.scene;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30.0, ratio, 1, 1000);
    this.camera.position.z = 20;
    this.renderer = new THREE.WebGLRenderer({alpha: true}); // {alpha: true} устанавливает прозрачность для сцены
    
    // вспомогательные линии
    const axisHelper = new THREE.axisHelper(500);
    this.scene.add(axisHelper);
    
    // отрисовка канвас
    container.appendChild(this.renderer.domElement);
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    
    // свет
    const light = new THREE.AmbientLight();
    this.scene.add(light);
    
    // форма
    const geometry = new THREE.SphereGeometry(5, 10, 10);
    const metreial = new THREE.MeshPhongMaterial({color: 0x000000});
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    
    this.controls = new THREE.TrackballControls(this.camera, container);
    
    // добавить на сцену
    this.animate();
  },
  
  animate: function () {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.onload = Player.init;



// - движение камеры
// трекболы (отвечают за движение камеры) подключаются отдельно
// https://github.com/mrdoob/three.js/tree/dev/examples/js/controls

this.controls = new THREE.TrackballControls(this.camera, container);


// - отладка
// three js inspector
// https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi

// нужно добавить в глобальную обл видимости
window.scene = this.scene;

