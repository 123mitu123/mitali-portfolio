document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TYPEWRITER ANIMATION (Optimized Phase Loops) ---
    const words = [
        "AI-Integrated Systems.", 
        "Full-Stack Product Architecture.", 
        "Exam Simulation Engines.", 
        "High-Performance EdTech."
    ];
    let i = 0, timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typewriter').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 60);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typewriter').innerHTML = word.join("");
            } else {
                i = (words.length > i + 1) ? i + 1 : 0;
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 40);
        };
        loopDeleting();
    }
    typingEffect();

    // --- 2. CANVAS INTERACTIVE NODE BACKGROUND NETWORK ---
    const canvas = document.getElementById("networkCanvas");
    const ctx = canvas.getContext("2d");
    let numNodes = window.innerWidth < 768 ? 25 : 55;
    const nodes = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Interactive mouse pushing force
            if (mouse.x != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 2;
                    this.y += (dy / distance) * force * 2;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
            ctx.fill();
        }
    }

    for (let i = 0; i < numNodes; i++) nodes.push(new Node());

    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        // Compute distances and render active lines
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - (dist / 110) * 0.15})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();

    // --- 3. SCROLL REVEAL & METRICS RUN COUNTER ---
    const revealElements = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll(".counter");
    let countersAnimated = false;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (entry.target.classList.contains("metrics-banner") || !countersAnimated) {
                    triggerCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
    // Explicit targeting for standalone dynamic counter trigger handling
    const banner = document.querySelector(".metrics-banner");
    if(banner) revealObserver.observe(banner);

    function triggerCounters() {
        countersAnimated = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 1500; // Total ms execution window
            const step = target / (duration / 16); // ~60fps step intervals
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.floor(current) + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    // --- 4. ACCELERATED PREMIUM TILT GRAPHICS EFFECT ---
    const tiltCards = document.querySelectorAll(".tilt-target");
    if (window.innerWidth > 968) {
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                // Fine adjustments to degrees to prevent erratic bouncing loops
                card.style.transform = `perspective(1000px) rotateX(${-y / 45}deg) rotateY(${x / 45}deg)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            });
        });
    }
});
