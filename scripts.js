// ThreeJS 3D game preview
document.addEventListener('DOMContentLoaded', function() {
  // Initialize ThreeJS scene
  const container = document.getElementById('game-preview-container');
  
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 10, 5);
  scene.add(directionalLight);

  // Create 3D rotating cube with #VIBEJAM text
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Create materials with different colors for each side
  const cubeMaterials = [
    new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.2 }), // Red
    new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.2 }), // Green
    new THREE.MeshPhongMaterial({ color: 0x0000ff, emissive: 0x0000ff, emissiveIntensity: 0.2 }), // Blue
    new THREE.MeshPhongMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.2 }), // Yellow
    new THREE.MeshPhongMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: 0.2 }), // Magenta
    new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.2 })  // Cyan
  ];
  
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
  scene.add(cube);
  
  // Add floating gamepad models
  const gamepadGeometry = new THREE.BoxGeometry(0.5, 0.3, 1);
  const gamepadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 100 });
  
  const gamepads = [];
  
  for (let i = 0; i < 5; i++) {
    const gamepad = new THREE.Mesh(gamepadGeometry, gamepadMaterial);
    gamepad.position.x = Math.sin(i * Math.PI / 2.5) * 3;
    gamepad.position.y = Math.cos(i * Math.PI / 2.5) * 3;
    gamepad.position.z = -1;
    scene.add(gamepad);
    gamepads.push({
      mesh: gamepad,
      speed: 0.01 + Math.random() * 0.02,
      angle: i * Math.PI / 2.5
    });
  }
  
  // Add particles for a more vibey effect
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 500;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 10;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    
    // Color - random vibrant colors
    colors[i * 3] = Math.random();     // r
    colors[i * 3 + 1] = Math.random(); // g
    colors[i * 3 + 2] = Math.random(); // b
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  // Position camera
  camera.position.z = 5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Move and rotate gamepads
    gamepads.forEach(gamepad => {
      gamepad.angle += gamepad.speed;
      gamepad.mesh.position.x = Math.sin(gamepad.angle) * 3;
      gamepad.mesh.position.y = Math.cos(gamepad.angle) * 3;
      gamepad.mesh.rotation.z += 0.02;
    });
    
    // Rotate particles
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
  });
  
  // Add interactive behavior to game cards
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('rainbow-border');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('rainbow-border');
    });
  });
});

// Create images directory and placeholder images for the game thumbnails
document.addEventListener('DOMContentLoaded', function() {
  // This is just a placeholder function
  // In a real implementation, you would have actual image files
  console.log("Game showcase site loaded!");
});

// Add dynamic loading of games from a JSON file (if it existed)
function loadGames() {
  // In a real implementation, this would fetch games from an API or JSON file
  // For demo purposes, we're using the hardcoded games in the HTML
  console.log("Games would be loaded dynamically here in a real implementation");
}

// Easter egg - Konami code activates a special effect
document.addEventListener('DOMContentLoaded', function() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiCodePosition = 0;

  document.addEventListener('keydown', function(e) {
    // Check if the key pressed matches the next key in the Konami code
    if (e.key === konamiCode[konamiCodePosition]) {
      konamiCodePosition++;
      
      // If the full Konami code was entered
      if (konamiCodePosition === konamiCode.length) {
        activateSpecialMode();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });

  function activateSpecialMode() {
    // Add a special effect to the page
    document.body.classList.add('konami-active');
    
    // Create falling ASCII art
    for (let i = 0; i < 50; i++) {
      createFallingElement();
    }
    
    // Remove the effect after 10 seconds
    setTimeout(function() {
      document.body.classList.remove('konami-active');
      const fallingElements = document.querySelectorAll('.falling-element');
      fallingElements.forEach(el => el.remove());
    }, 10000);
  }

  function createFallingElement() {
    const element = document.createElement('div');
    element.classList.add('falling-element');
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.animationDuration = (Math.random() * 5 + 3) + 's';
    element.innerHTML = ['👾', '🎮', '🕹️', '💾', '🎲', '👽'][Math.floor(Math.random() * 6)];
    document.body.appendChild(element);
    
    // Remove the element when animation ends
    setTimeout(function() {
      element.remove();
    }, 8000);
  }
});

// VIBEJAM 2025 EXTREME EDITION - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // MIDI Player Controls
  const midiToggle = document.getElementById('midi-toggle');
  const midiPlayer = document.getElementById('midi-player');
  if (midiToggle && midiPlayer) {
    midiToggle.addEventListener('click', function() {
      if (midiPlayer.paused) {
        midiPlayer.play();
        midiToggle.innerHTML = '<img src="geo-bootstrap/img/audio/sound.gif" height="20"> MUTE EXTREME SOUND';
      } else {
        midiPlayer.pause();
        midiToggle.innerHTML = '<img src="geo-bootstrap/img/audio/sound.gif" height="20"> PLAY EXTREME SOUND';
      }
    });
  }
  
  // Initialize 3D Game Preview
  initGamePreview();
  
  // Add cursor trails
  initCursorTrails();
  
  // Add the Konami Code Easter Egg
  initKonamiCode();
  
  // Add falling elements
  setInterval(addRandomFallingElement, 3000);
  
  // Add random glitch effects
  setInterval(randomGlitchEffect, 5000);
  
  // Make the visitor counter increase randomly
  initVisitorCounter();
  
  // Initialize all the tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  // Add hover effects to game cards
  $('.game-card').hover(
    function() {
      $(this).addClass('rainbow-border');
      playRandomSound();
    },
    function() {
      $(this).removeClass('rainbow-border');
    }
  );
  
  // Add explosion effects on button clicks
  $('.btn').on('click', function(e) {
    createExplosion(e.clientX, e.clientY);
  });
  
  // CRAZY MODE toggle
  $('#crazy-mode-toggle').on('click', function() {
    $('body').toggleClass('crazy-mode');
    
    if ($('body').hasClass('crazy-mode')) {
      $(this).html('<img src="geo-bootstrap/img/test/hot.gif" height="20"> TOO CRAZY? CLICK TO CHILL');
      intensifyCraziness();
    } else {
      $(this).html('<img src="geo-bootstrap/img/test/hot.gif" height="20"> CLICK FOR EXTREME MODE');
      reduceCraziness();
    }
  });
});

// Cursor trails
function initCursorTrails() {
  document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    // Randomize trail color
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Remove the trail after animation
    setTimeout(function() {
      trail.remove();
    }, 800);
  });
}

// Explosions
function createExplosion(x, y) {
  const explosionArea = document.getElementById('explosion-area');
  if (!explosionArea) {
    const div = document.createElement('div');
    div.id = 'explosion-area';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.pointerEvents = 'none';
    div.style.zIndex = '9999';
    document.body.appendChild(div);
  }
  
  const explosion = document.createElement('img');
  explosion.src = 'geo-bootstrap/img/test/explosion.gif';
  explosion.style.position = 'fixed';
  explosion.style.left = (x - 50) + 'px';
  explosion.style.top = (y - 50) + 'px';
  explosion.style.width = '100px';
  explosion.style.height = '100px';
  explosion.style.pointerEvents = 'none';
  explosion.style.zIndex = '9999';
  
  document.getElementById('explosion-area').appendChild(explosion);
  
  setTimeout(() => {
    explosion.remove();
  }, 1000);
}

// Random sounds
function playRandomSound() {
  if (Math.random() > 0.7) { // Only play 30% of the time to avoid sound spam
    const sounds = [
      'geo-bootstrap/audio/beep.mp3',
      'geo-bootstrap/audio/click.mp3',
      'geo-bootstrap/audio/wow.mp3',
      'geo-bootstrap/audio/boing.mp3'
    ];
    
    const sound = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    sound.volume = 0.2; // Lower volume
    sound.play();
  }
}

// Add random falling elements
function addRandomFallingElement() {
  const fallingEmojis = ['🎮', '👾', '🕹️', '🎯', '🎲', '🎪', '💯', '🔥', '⚡', '💥', '✨', '💫'];
  const element = document.createElement('div');
  element.className = 'falling-element';
  element.textContent = fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
  element.style.left = Math.random() * window.innerWidth + 'px';
  
  // Random fall duration between 3-8 seconds
  const duration = 3 + Math.random() * 5;
  element.style.animation = `fall ${duration}s linear forwards`;
  
  document.body.appendChild(element);
  
  // Remove the element after animation
  setTimeout(function() {
    element.remove();
  }, duration * 1000);
}

// Random glitch effects
function randomGlitchEffect() {
  const headers = document.querySelectorAll('h1, h2, h3');
  if (headers.length > 0) {
    const randomHeader = headers[Math.floor(Math.random() * headers.length)];
    randomHeader.classList.add('distort-text');
    setTimeout(function() {
      randomHeader.classList.remove('distort-text');
    }, 500);
  }
}

// Initialize visitor counter
function initVisitorCounter() {
  const visitorCountElement = document.getElementById('visitor-count');
  const visitorCountMarquee = document.getElementById('visitor-count-marquee');
  
  if (visitorCountElement) {
    // Get global counter from server or use a more realistic mechanism
    // For demo, we'll use sessionStorage to detect new sessions only
    const hasVisited = sessionStorage.getItem('vibejam_has_visited');
    
    // Get persistent count from localStorage (starts at 1 if not set)
    let count = parseInt(localStorage.getItem('vibejam_visitor_count')) || 1;
    
    // Only increment for new sessions
    if (!hasVisited) {
      // Mark this session as counted
      sessionStorage.setItem('vibejam_has_visited', 'true');
      count++;
      localStorage.setItem('vibejam_visitor_count', count.toString());
      
      // Flash effect for new increment
      flashVisitorCount();
    }
    
    // Display formatted count
    visitorCountElement.textContent = count.toLocaleString();
    
    // Update marquee text if element exists
    if (visitorCountMarquee) {
      visitorCountMarquee.textContent = count.toLocaleString();
    }
    
    // Occasional blink effect for the counter without changing values
    setInterval(function() {
      if (Math.random() > 0.7) { // Only blink sometimes for effect
        flashVisitorCount();
      }
    }, 8000);
  }
}

// Flash effect for the visitor counter
function flashVisitorCount() {
  const counterDigits = document.querySelector('.visitor-count-digits');
  if (counterDigits) {
    // Add flash class
    counterDigits.classList.add('counter-flash');
    
    // Remove after animation completes
    setTimeout(function() {
      counterDigits.classList.remove('counter-flash');
    }, 500);
  }
}

// Initialize 3D Game Preview
function initGamePreview() {
  // Check if container exists
  const container = document.getElementById('game-preview-container');
  if (!container) return;
  
  // Initialize Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add a crazy wireframe cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const wireframe = new THREE.WireframeGeometry(geometry);
  const material = new THREE.LineBasicMaterial({ 
    color: 0x00ffff,
    linewidth: 2
  });
  
  const cube = new THREE.LineSegments(wireframe, material);
  scene.add(cube);
  
  // Add point lights for a retro effect
  const light1 = new THREE.PointLight(0xff00ff, 1, 100);
  light1.position.set(5, 5, 5);
  scene.add(light1);
  
  const light2 = new THREE.PointLight(0x00ffff, 1, 100);
  light2.position.set(-5, -5, -5);
  scene.add(light2);
  
  // Add floating text
  addFloatingText(scene, "VIBEJAM", 0, 0.5, -1, 0xff00ff);
  addFloatingText(scene, "2025", 0, -0.5, -1, 0x00ffff);
  
  // Add particles
  addParticles(scene);
  
  camera.position.z = 5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Pulsate cube
    const time = Date.now() * 0.001;
    cube.scale.x = Math.sin(time) * 0.5 + 1;
    cube.scale.y = Math.sin(time * 1.1) * 0.5 + 1;
    cube.scale.z = Math.sin(time * 1.2) * 0.5 + 1;
    
    // Change colors over time
    const hue = (time * 0.1) % 1;
    cube.material.color.setHSL(hue, 1, 0.5);
    
    light1.position.x = Math.sin(time * 0.7) * 3;
    light1.position.y = Math.cos(time * 0.5) * 3;
    light1.position.z = Math.cos(time * 0.3) * 3;
    
    light2.position.x = Math.cos(time * 0.3) * 3;
    light2.position.y = Math.sin(time * 0.5) * 3;
    light2.position.z = Math.sin(time * 0.7) * 3;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Make 3D preview responsive
  window.addEventListener('resize', function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Interactive elements
  container.addEventListener('mousemove', function(event) {
    const rect = container.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    cube.rotation.x = mouseY * 2;
    cube.rotation.y = mouseX * 2;
  });
  
  container.addEventListener('click', function() {
    // Add explosion on click
    const particles = createExplosionParticles();
    scene.add(particles);
    
    setTimeout(() => {
      scene.remove(particles);
    }, 1000);
  });
}

// Add floating text to scene
function addFloatingText(scene, text, x, y, z, color) {
  const loader = new THREE.FontLoader();
  
  // Use a callback approach since we might not have the actual three.js loader
  try {
    // Create a basic TextGeometry if FontLoader isn't available
    const geometry = new THREE.TextGeometry(text, {
      size: 0.5,
      height: 0.1,
    });
    
    const material = new THREE.MeshBasicMaterial({ color: color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(x, y, z);
    scene.add(textMesh);
  } catch (e) {
    // Fallback to a simple cube with a text label if TextGeometry isn't working
    const geometry = new THREE.BoxGeometry(text.length * 0.2, 0.4, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(x, y, z);
    scene.add(textMesh);
  }
}

// Add particles
function addParticles(scene) {
  const particleCount = 1000;
  const particles = new THREE.BufferGeometry();
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    // Position
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // Color
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true
  });
  
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
  
  // Animate particles
  function animateParticles() {
    const positions = particleSystem.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Move particles in a wave pattern
      positions[i3 + 1] += Math.sin(Date.now() * 0.001 + positions[i3]) * 0.01;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

// Create explosion particles
function createExplosionParticles() {
  const particleCount = 100;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 0.1
  });
  
  const particles = new THREE.Points(geometry, material);
  
  // Animation variables
  const velocities = [];
  for (let i = 0; i < particleCount; i++) {
    velocities.push({
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.3
    });
  }
  
  // Animation function
  function animateExplosion() {
    const positions = particles.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    
    requestAnimationFrame(animateExplosion);
  }
  
  animateExplosion();
  
  return particles;
}

// Konami Code Easter Egg
function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiCodePosition = 0;
  
  document.addEventListener('keydown', function(e) {
    // Get the key that was pressed
    const key = e.key.toLowerCase();
    
    // Check if the key matches the konami code sequence
    const requiredKey = konamiCode[konamiCodePosition].toLowerCase();
    
    if (key === requiredKey) {
      // Move to the next position in the sequence
      konamiCodePosition++;
      
      // Flash the screen to show progress
      flashScreen();
      
      // If the entire sequence is complete
      if (konamiCodePosition === konamiCode.length) {
        activateKonamiCode();
        konamiCodePosition = 0; // Reset for next time
      }
    } else {
      konamiCodePosition = 0; // Reset on any wrong key
    }
  });
}

// Flash screen to show Konami code progress
function flashScreen() {
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0';
  flash.style.left = '0';
  flash.style.width = '100%';
  flash.style.height = '100%';
  flash.style.backgroundColor = 'rgba(255, 0, 255, 0.2)';
  flash.style.zIndex = '9999';
  flash.style.pointerEvents = 'none';
  document.body.appendChild(flash);
  
  setTimeout(function() {
    flash.remove();
  }, 100);
}

// Activate Konami Code effects
function activateKonamiCode() {
  // Add the special class to body
  document.body.classList.add('konami-active');
  
  // Show the hidden section
  const hiddenSection = document.getElementById('secret-developer-zone');
  if (hiddenSection) {
    hiddenSection.style.display = 'block';
  }
  
  // Make tons of falling elements
  for (let i = 0; i < 50; i++) {
    setTimeout(function() {
      addRandomFallingElement();
    }, i * 100);
  }
  
  // Play a special sound
  const sound = new Audio('geo-bootstrap/audio/secret.mp3');
  sound.volume = 0.3;
  sound.play();
  
  // Show a success message
  alert('!!! SECRET DEVELOPER ZONE UNLOCKED !!!');
}

// Intensify or reduce crazy effects
function intensifyCraziness() {
  // Make more elements shake
  const allElements = document.querySelectorAll('h1, h2, h3, p, button, .btn, .card');
  allElements.forEach(function(element, index) {
    if (index % 3 === 0) element.classList.add('shake-text');
    if (index % 5 === 0) element.classList.add('text-wobble');
    if (index % 7 === 0) element.classList.add('blink-fast');
  });
  
  // Increase falling elements frequency
  window.crazyInterval = setInterval(addRandomFallingElement, 1000);
  
  // Add more floating GIFs
  addExtraFloatingGifs();
}

function reduceCraziness() {
  // Remove effects
  const allElements = document.querySelectorAll('.shake-text, .text-wobble, .blink-fast');
  allElements.forEach(function(element) {
    element.classList.remove('shake-text', 'text-wobble', 'blink-fast');
  });
  
  // Clear the crazy interval
  if (window.crazyInterval) {
    clearInterval(window.crazyInterval);
  }
  
  // Remove extra floating GIFs
  const extraGifs = document.querySelectorAll('.extra-floating-gif');
  extraGifs.forEach(function(gif) {
    gif.remove();
  });
}

function addExtraFloatingGifs() {
  const gifSources = [
    'geo-bootstrap/img/test/construction.gif',
    'geo-bootstrap/img/test/new.gif',
    'geo-bootstrap/img/test/hot.gif',
    'geo-bootstrap/img/test/spinningearth.gif',
    'geo-bootstrap/img/test/email.gif'
  ];
  
  for (let i = 0; i < 10; i++) {
    const gif = document.createElement('img');
    gif.src = gifSources[Math.floor(Math.random() * gifSources.length)];
    gif.className = 'floating-gif extra-floating-gif';
    gif.style.position = 'fixed';
    gif.style.zIndex = '9999';
    gif.style.pointerEvents = 'none';
    gif.style.top = Math.random() * 100 + '%';
    gif.style.left = Math.random() * 100 + '%';
    gif.style.width = (Math.random() * 50 + 30) + 'px';
    gif.style.height = (Math.random() * 50 + 30) + 'px';
    gif.style.animation = `float${Math.floor(Math.random() * 4) + 1} ${Math.random() * 10 + 10}s ease-in-out infinite`;
    document.body.appendChild(gif);
  }
}

$(document).ready(function() {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  // Initialize music player controls
  initMusicPlayer();
  
  // Initialize cursor trails
  initCursorTrails();
  
  // Initialize Konami code
  initKonamiCode();
  
  // Add random falling elements
  setInterval(addRandomFallingElement, 3000);
  
  // Random glitch on headers
  setInterval(randomGlitchOnHeaders, 5000);
  
  // Initialize visitor counter
  initVisitorCounter();
  
  // Initialize explosion effects on buttons
  initExplosionEffects();
  
  // Initialize crazy mode toggle
  initCrazyModeToggle();

  // Initialize game card hover effects
  initGameCardHover();
  
  // Initialize unicorn mode
  initUnicornMode();
});

// Music player controls
function initMusicPlayer() {
  // ... existing code ...
}

// ... rest of the existing code ...

// REMOVE OR COMMENT OUT THE initGamePreview FUNCTION
/*
function initGamePreview() {
  // All the 3D game preview initialization code
  // ...
}
*/
// ... existing code ...

// Initialize unicorn mode
function initUnicornMode() {
  const unicornToggle = document.getElementById('unicorn-mode-toggle');
  const floatingUnicorn = document.getElementById('floating-unicorn');
  const body = document.body;
  const cursorTrails = [];
  let unicornMode = false;
  let lastX = 0;
  let lastY = 0;
  
  // Toggle unicorn mode when the button is clicked
  if (unicornToggle) {
    unicornToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      unicornMode = !unicornMode;
      
      if (unicornMode) {
        // Enable unicorn mode
        body.classList.add('unicorn-mode');
        floatingUnicorn.classList.add('unicorn-visible');
        
        // Play unicorn sound
        const unicornSound = new Audio('https://web.archive.org/web/20091021130716/http://geocities.com/EnchantedForest/Meadow/8812/horse.wav');
        unicornSound.volume = 0.3;
        unicornSound.play();
        
        // Add rainbow trail effect
        document.addEventListener('mousemove', createUnicornTrail);
        
        // Announce unicorn mode
        const announcement = document.createElement('div');
        announcement.className = 'falling-element';
        announcement.innerText = '✨ UNICORN MODE ACTIVATED! ✨';
        announcement.style.color = '#ff00ff';
        announcement.style.fontWeight = 'bold';
        announcement.style.fontSize = '24px';
        document.body.appendChild(announcement);
        
        // Change all headers to rainbow text
        const headers = document.querySelectorAll('h1, h2, h3');
        headers.forEach(header => {
          if (!header.classList.contains('rainbow-text')) {
            header.classList.add('rainbow-text');
          }
        });
        
        // Update button text
        unicornToggle.innerHTML = 'NORMAL MODE <img src="geo-bootstrap/img/test/hot.gif">';
      } else {
        // Disable unicorn mode
        body.classList.remove('unicorn-mode');
        floatingUnicorn.classList.remove('unicorn-visible');
        
        // Remove rainbow trail effect
        document.removeEventListener('mousemove', createUnicornTrail);
        
        // Remove all unicorn cursor trails
        cursorTrails.forEach(trail => {
          if (trail && trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
        });
        cursorTrails.length = 0;
        
        // Update button text
        unicornToggle.innerHTML = 'UNICORN MODE <img src="geo-bootstrap/img/test/new2.gif">';
      }
    });
  }
  
  // Create unicorn cursor trail
  function createUnicornTrail(e) {
    // Only create a trail every 100ms to avoid overloading the DOM
    if (Date.now() - lastTrailTime < 100) return;
    lastTrailTime = Date.now();
    
    const trail = document.createElement('div');
    trail.className = 'unicorn-cursor-trail';
    trail.style.left = e.clientX - 15 + 'px';
    trail.style.top = e.clientY - 15 + 'px';
    document.body.appendChild(trail);
    
    // Add to array to keep track
    cursorTrails.push(trail);
    
    // Animate and remove after animation completes
    setTimeout(() => {
      trail.style.opacity = '0';
      setTimeout(() => {
        if (trail && trail.parentNode) {
          trail.parentNode.removeChild(trail);
          const index = cursorTrails.indexOf(trail);
          if (index > -1) {
            cursorTrails.splice(index, 1);
          }
        }
      }, 500);
    }, 1000);
  }
  
  let lastTrailTime = 0;
  
  // Create rainbow trail effect
  function createRainbowTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'rainbow-trail';
    trail.style.top = e.clientY + 'px';
    trail.style.opacity = '1';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.style.opacity = '0';
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 200);
    }, 100);
  }
}

// ... existing code ... 