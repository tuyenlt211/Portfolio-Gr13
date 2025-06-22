document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Three.js');

    // Smooth scrolling
    document.querySelectorAll('.sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation
    new Typed('.typing-target', {
        strings: ['Tôi là một developer đam mê công nghệ.', 'Luôn tìm kiếm cơ hội để đổi mới và sáng tạo.', 'Chào mừng bạn đến với portfolio của tôi!'],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '│'
    });

    // Scroll-triggered animations
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.parallax-section').forEach(section => {
        gsap.fromTo(section.querySelector('.content'), {
            opacity: 0,
            y: 100,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Add .visible class for h2 slide-in
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => section.classList.add('visible'),
            onLeaveBack: () => section.classList.remove('visible')
        });
    });

    // About cards animation
    document.querySelectorAll('.about-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });

    // Timeline items animation
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        gsap.fromTo(item, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });

    // Hobby cards animation
    document.querySelectorAll('.hobby-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });

    // Content parallax
    document.querySelectorAll('.content').forEach(box => {
        gsap.to(box, {
            y: -30,
            scrollTrigger: {
                trigger: box,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Three.js background (Solar System)
    const bgScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(window.devicePixelRatio);
    const bgCanvas = document.getElementById('webgl-canvas');
    if (bgCanvas) {
        bgCanvas.appendChild(bgRenderer.domElement);
        console.log('Background renderer initialized');
    } else {
        console.error('Background canvas (#webgl-canvas) not found');
    }

    // Lights for realism
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    bgScene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 0);
    bgScene.add(pointLight);

    // Solar system container
    const solarSystem = new THREE.Group();
    bgScene.add(solarSystem);
    solarSystem.position.set(-20, 20, 0);
    solarSystem.rotation.x = Math.PI / 4;
    solarSystem.rotation.z = Math.PI / 4;

    // Scroll animation for solar system
    gsap.to(solarSystem.position, {
        x: 20,
        y: -20,
        scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
    gsap.to(solarSystem.rotation, {
        y: Math.PI / 2,
        scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.8,
        roughness: 0.6
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);

    // Planets
    const planets = [];
    const planetData = [
        { name: 'Mercury', size: 0.4, distance: 8, color: 0xaaaaaa, speed: 0.02, emissive: 0x555555 },
        { name: 'Venus', size: 0.9, distance: 12, color: 0xffcc00, speed: 0.015, emissive: 0x886600 },
        { name: 'Earth', size: 1, distance: 16, color: 0x00b7ff, speed: 0.01, emissive: 0x004466 },
        { name: 'Mars', size: 0.6, distance: 20, color: 0xff4500, speed: 0.008, emissive: 0x882200 },
        { name: 'Jupiter', size: 3, distance: 28, color: 0xffa500, speed: 0.005, emissive: 0x884400 },
        { name: 'Saturn', size: 2.5, distance: 36, color: 0xeedd82, speed: 0.004, emissive: 0x776622 },
        { name: 'Uranus', size: 1.8, distance: 44, color: 0x66cccc, speed: 0.003, emissive: 0x336666 },
        { name: 'Neptune', size: 1.7, distance: 52, color: 0x0000ff, speed: 0.002, emissive: 0x000066 }
    ];

    planetData.forEach(data => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            emissive: data.emissive,
            emissiveIntensity: 0.3,
            roughness: 0.7
        });
        const planet = new THREE.Mesh(geometry, material);
        const orbit = new THREE.Object3D();
        orbit.userData = { speed: data.speed };
        orbit.add(planet);
        planet.position.x = data.distance;
        solarSystem.add(orbit);
        planets.push(orbit);

        const orbitCurve = new THREE.EllipseCurve(0, 0, data.distance, data.distance * 0.85, 0, 2 * Math.PI, false, 0);
        const points = orbitCurve.getPoints(100);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444 });
        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
        solarSystem.add(orbitLine);
    });

    // Meteor shower
    const meteorGeometry = new THREE.BufferGeometry();
    const meteorCount = 10;
    const meteorPositions = new Float32Array(meteorCount * 3);
    const meteorVelocities = new Float32Array(meteorCount * 3);
    for (let i = 0; i < meteorCount; i++) {
        meteorPositions[i * 3] = (Math.random() - 0.5) * 100;
        meteorPositions[i * 3 + 1] = 50;
        meteorPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        meteorVelocities[i * 3] = (Math.random() - 0.5) * 0.5;
        meteorVelocities[i * 3 + 1] = -Math.random() * 0.8 - 0.5;
        meteorVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    meteorGeometry.setAttribute('position', new THREE.BufferAttribute(meteorPositions, 3));
    const meteorMaterial = new THREE.PointsMaterial({
        color: 0xffffaa,
        size: 0.4,
        transparent: true,
        opacity: 0.9
    });
    const meteorPoints = new THREE.Points(meteorGeometry, meteorMaterial);
    bgScene.add(meteorPoints);

    // Background stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 200;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    bgScene.add(stars);

    camera.position.z = 60;

    // Scroll-based camera animation
    gsap.to(camera.position, {
        z: 30,
        scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        planets.forEach(orbit => {
            orbit.rotation.y += orbit.userData.speed;
        });
        stars.rotation.y += 0.0002;
        for (let i = 0; i < meteorCount; i++) {
            meteorPositions[i * 3] += meteorVelocities[i * 3];
            meteorPositions[i * 3 + 1] += meteorVelocities[i * 3 + 1];
            meteorPositions[i * 3 + 2] += meteorVelocities[i * 3 + 2];
            if (meteorPositions[i * 3 + 1] < -50) {
                meteorPositions[i * 3] = (Math.random() - 0.5) * 100;
                meteorPositions[i * 3 + 1] = 50;
                meteorPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
                meteorVelocities[i * 3] = (Math.random() - 0.5) * 0.5;
                meteorVelocities[i * 3 + 1] = -Math.random() * 0.8 - 0.5;
                meteorVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            }
        }
        meteorGeometry.attributes.position.needsUpdate = true;
        bgRenderer.render(bgScene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Skill bar animation
    document.querySelectorAll('.skills-list li').forEach(skill => {
        const level = skill.dataset.level;
        gsap.to(skill.querySelector('.skill-level'), {
            width: `${level}%`,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: skill,
                start: 'top 90%',
                toggleActions: 'play none none reset'
            }
        });
    });

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        console.log('Form submitted:', data);
        alert('Tin nhắn đã được gửi!');
        e.target.reset();
    });
});