// Text Behind Object Effects - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic color changing for background text
    const backgroundTexts = document.querySelectorAll('.background-text');
    const colors = [
        'rgba(255, 107, 107, 0.15)',
        'rgba(102, 126, 234, 0.15)',
        'rgba(254, 202, 87, 0.15)',
        'rgba(168, 230, 207, 0.15)',
        'rgba(72, 202, 228, 0.15)'
    ];

    // Add click event to cycle through colors
    backgroundTexts.forEach((text, index) => {
        let colorIndex = 0;
        text.addEventListener('click', function() {
            colorIndex = (colorIndex + 1) % colors.length;
            this.style.color = colors[colorIndex];
            this.style.transition = 'color 0.3s ease';
        });
    });

    // Parallax effect for background text
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.background-text');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) ${element.style.transform.includes('rotate') ? element.style.transform.match(/rotate\([^)]*\)/)[0] : ''}`;
        });
    });

    // Add typing effect to foreground content
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add typing effect to h3 elements when they come into view
                const h3Element = entry.target.querySelector('h3');
                if (h3Element && !h3Element.dataset.typed) {
                    const originalText = h3Element.textContent;
                    h3Element.dataset.typed = 'true';
                    setTimeout(() => {
                        typeWriter(h3Element, originalText, 100);
                    }, 300);
                }
            }
        });
    }, observerOptions);

    // Observe all effect containers
    document.querySelectorAll('.effect-container').forEach(container => {
        observer.observe(container);
    });

    // Add mouse move effect for interactive elements
    const interactiveContainers = document.querySelectorAll('.effect-container');
    
    interactiveContainers.forEach(container => {
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;
            
            const object = container.querySelector('.object');
            if (object && !object.classList.contains('no-mouse-effect')) {
                object.style.transform = `translate(${moveX}px, ${moveY}px) ${object.style.transform.includes('rotate') ? object.style.transform.match(/rotate\([^)]*\)/)[0] : ''}`;
            }
        });
        
        container.addEventListener('mouseleave', function() {
            const object = container.querySelector('.object');
            if (object && !object.classList.contains('no-mouse-effect')) {
                object.style.transform = object.style.transform.includes('rotate') ? object.style.transform.match(/rotate\([^)]*\)/)[0] : '';
                object.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    object.style.transition = '';
                }, 300);
            }
        });
    });

    // Add click-to-copy functionality for CSS code snippets
    function addCopyButton() {
        const codeSnippet = `
/* Basic Text Behind Object Effect */
.container {
    position: relative;
}

.background-text {
    position: absolute;
    font-size: 8rem;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.05);
    z-index: 1;
    pointer-events: none;
}

.object {
    position: absolute;
    z-index: 2;
}

.foreground-content {
    position: absolute;
    z-index: 3;
}
        `;

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy CSS Code';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        copyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });

        copyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });

        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(codeSnippet).then(() => {
                this.textContent = 'Copied!';
                this.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                setTimeout(() => {
                    this.textContent = 'Copy CSS Code';
                    this.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                }, 2000);
            });
        });

        document.body.appendChild(copyButton);
    }

    // Add the copy button
    addCopyButton();

    // Console message for developers
    console.log(`
    🎨 Text Behind Object Effects Demo
    ================================
    
    This demo showcases various CSS techniques for creating text-behind-object effects:
    
    1. Z-index layering
    2. Absolute positioning
    3. CSS transformations
    4. Blend modes
    5. Interactive animations
    
    Feel free to inspect the code and use these techniques in your projects!
    
    Created with ❤️ by Claude
    `);
});

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .copy-button:active {
        transform: translateY(1px) !important;
    }
`;

document.head.appendChild(style);