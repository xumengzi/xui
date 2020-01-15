
$(function () { 
  var container = document.querySelector(".snow-container"); 
  if (/MSIE 6|MSIE 7|MSIE 8/.test(navigator.userAgent)) { 
    return 
  } else { 
    if (/MSIE 9|MSIE 10/.test(navigator.userAgent)) { 
      $(container).css("height", $(window).height()).bind("click", function () { 
        $(this).remove()
      })
    }
  }
  var containerWidth = $(container).width(); 
  var containerHeight = $(container).height(); 
  var particle; 
  var camera; 
  var scene; 
  var renderer; 
  var mouseX = 0; 
  var mouseY = 0; 
  var windowHalfX = window.innerWidth / 2; 
  var windowHalfY = window.innerHeight / 2; 
  var particles = []; 
  var particleImage = new Image(); 
  particleImage.src = "//img14.360buyimg.com/cms/jfs/t595/323/625407732/3275/e86993e8/5476ba25Ne75aa640.png"; 
  var snowNum = 500; 
  function init() { 
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 10000); 
    camera.position.z = 1000; 
    scene = new THREE.Scene(); 
    scene.add(camera); 
    renderer = new THREE.CanvasRenderer(); 
    renderer.setSize(containerWidth, containerHeight); 
    var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) }); 
    for (var i = 0; i < snowNum; i++) { 
      particle = new Particle3D(material); 
      particle.position.x = Math.random() * 2000 - 1000; 
      particle.position.y = Math.random() * 2000 - 1000; 
      particle.position.z = Math.random() * 2000 - 1000; 
      particle.scale.x = particle.scale.y = 1; 
      scene.add(particle); 
      particles.push(particle) 
    }
    container.appendChild(renderer.domElement); 
    document.addEventListener("mousemove", onDocumentMouseMove, false); 
    document.addEventListener("touchstart", onDocumentTouchStart, false); 
    document.addEventListener("touchmove", onDocumentTouchMove, false); 
    setInterval(loop, 1000 / 40)
  }
  function onDocumentMouseMove(event) { 
    mouseX = event.clientX - windowHalfX; 
    mouseY = event.clientY - windowHalfY 
  } 
  function onDocumentTouchStart(event) { 
    if (event.touches.length == 1) { 
      event.preventDefault(); 
      mouseX = event.touches[0].pageX - windowHalfX; 
      mouseY = event.touches[0].pageY - windowHalfY 
    } 
  } 
  function onDocumentTouchMove(event) { 
    if (event.touches.length == 1) { 
      event.preventDefault(); 
      mouseX = event.touches[0].pageX - windowHalfX; 
      mouseY = event.touches[0].pageY - windowHalfY 
    } 
  } 
  function loop() { 
    for (var i = 0; i < particles.length; i++) { 
      var particle = particles[i]; 
      particle.updatePhysics(); 
      with (particle.position) { 
        if (y < -1000) { 
          y += 2000 
        } 
        if (x > 1000) { 
          x -= 2000 
        } else { 
          if (x < -1000) { 
            x += 2000 
          } 
        } if (z > 1000) { 
          z -= 2000 
        } else { 
          if (z < -1000) { 
            z += 2000 
          }
        }
      }
    }
    camera.position.x += (mouseX - camera.position.x) * 0.005; 
    camera.position.y += (-mouseY - camera.position.y) * 0.005; 
    camera.lookAt(scene.position); 
    renderer.render(scene, camera) 
  }
  init()
});