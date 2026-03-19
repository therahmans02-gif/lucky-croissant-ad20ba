// Falling moons effect using canvas
function createFallingMoons() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
            const pieces = [];
            const colors = ['#ffd700', '#ffed4e', '#fbbf24', '#facc15']; // Sparkle colors
            ctx.font = 'bold Arial'; // Smooth font rendering
    
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -100,
            vx: 0,
            vy: 3 + Math.random() * 3,
            size: 12 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        pieces.forEach(p => {
            p.x += p.vx * 0.8;
            p.y += p.vy * 0.8;
            p.vy += 0.02; // smoother gravity
            p.rotation += p.vrot * 0.5;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.font = `${Math.floor(p.size)}px Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = p.color;
            ctx.fillText('✨', 0, 0);
            ctx.restore();
            
            if (p.y > canvas.height + 50) {
                p.y = -30;
                p.x = Math.random() * canvas.width;
                p.vy = Math.random() * 2 + 1;
            }
        });
        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(animate);
    }
    let frameCount = 0;
    const totalFrames = 240; // 4s fast
    function animate() {
        frameCount++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        pieces.forEach(p => {
            p.x += p.vx * 0.3;
            p.y += p.vy;
            p.vy += 0.035;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.font = `${Math.floor(p.size)}px Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = p.color;
            ctx.fillText('✨', 0, 0);
            ctx.restore();
        });
        ctx.globalCompositeOperation = 'source-over';
        if (frameCount < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(canvas);
        }
    }
    requestAnimationFrame(animate);
}

// Button interaction
document.getElementById('celebrateBtn').addEventListener('click', function() {
createFallingMoons();
    this.textContent = 'Eid Mubarak! 🌙✨';
    this.style.background = 'linear-gradient(145deg, #1e3a8a, #1e40af)';
    
    setTimeout(() => {
        this.textContent = 'Celebrate Now! 🎉';
        this.style.background = 'linear-gradient(145deg, #006400, #228B22)';
    }, 3000);
});

// Initial greeting animation
window.addEventListener('load', () => {
    document.querySelector('.glow').style.opacity = '0';
    document.querySelector('.glow').style.transform = 'scale(0.5)';
    document.querySelector('.sub').style.opacity = '0';
    
    setTimeout(() => {
        document.querySelector('.glow').style.transition = 'all 1.5s ease';
        document.querySelector('.glow').style.opacity = '1';
        document.querySelector('.glow').style.transform = 'scale(1)';
    }, 500);
    
    setTimeout(() => {
        document.querySelector('.sub').style.transition = 'all 1.5s ease';
        document.querySelector('.sub').style.opacity = '1';
    }, 1000);
    
    // Short initial confetti
    setTimeout(createConfetti, 2500);
});

// Resize canvas on window resize if needed (but since short-lived, optional)
window.addEventListener('resize', () => {
    // Handled by creation logic
});

// Option password protection
const passwords = {
    1: 'amiutsho69',
    2: 'amisraboni67',
    3: 'amiupoma69', 
    4: 'amikumra69'
};

let currentOptionContent = null;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const optionId = parseInt(card.dataset.option);
            showPasswordModal(optionId, card.querySelector('h3').textContent);
        });
    });
});

function showPasswordModal(optionId, name) {
    const modalHTML = `
        <div id="password-modal" class="modal-overlay">
            <div class="modal-content">
                <h3>Enter password for ${name}</h3>
                <input type="password" id="password-input" placeholder="Password">
                <div class="modal-buttons">
                    <button onclick="checkPassword(${optionId})">Enter</button>
                    <button onclick="closeModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('password-input').focus();
}

function checkPassword(optionId) {
    const input = document.getElementById('password-input');
    if (input.value === passwords[optionId]) {
        closeModal();
        showGoldenLightAnimation(optionId);
    } else {
        input.style.borderColor = '#ff4444';
        input.value = '';
        setTimeout(() => input.style.borderColor = '', 1000);
    }
}


function closeModal() {
    const modal = document.getElementById('password-modal');
    if (modal) modal.remove();
}

function showGoldenLightAnimation(optionId) {
    // Hide options temporarily
    const optionsSection = document.querySelector('.options-section');
    optionsSection.style.opacity = '0.3';
    optionsSection.style.pointerEvents = 'none';

    // Full screen golden lights for whole website
    const sectionTop = 0;
    const sectionHeight = window.innerHeight * 1.5 + 'px';

    const leftLight = document.createElement('div');
    leftLight.style.cssText = `
        position: fixed;
        top: ${sectionTop}px;
        left: 0;
        width: 60vw;
        height: ${sectionHeight};
        background: linear-gradient(to right, rgba(255,215,0,0.8), transparent);
        z-index: 3000;
        opacity: 0;
        pointer-events: none;
        border-radius: 0 50% 50% 0;
        box-shadow: 0 0 50px rgba(255,215,0,0.6);
    `;
    const rightLight = document.createElement('div');
    rightLight.style.cssText = `
        position: fixed;
        top: ${sectionTop}px;
        right: 0;
        width: 60vw;
        height: ${sectionHeight}px;
        background: linear-gradient(to left, rgba(255,215,0,0.8), transparent);
        z-index: 3000;
        opacity: 0;
        pointer-events: none;
        border-radius: 50% 0 0 50%;
        box-shadow: 0 0 50px rgba(255,215,0,0.6);
    `;
    document.body.appendChild(leftLight);
    document.body.appendChild(rightLight);

    // Messages for each option
    const messages = {
        1: `Eid Mubarak, dear brother! 🌙✨<br>May this beautiful occasion bring you endless happiness, success, and peace. May Allah bless you with good health and all your heart's desires. Enjoy this Eid to the fullest!`,
        2: `Eid Mubarak, dear sister! 🌙✨<br>May Allah shower His blessings upon you and your family. Wishing you a joyful Eid filled with love, laughter, and sweet moments.`,
        3: `Eid Mubarak, Gaeibhai! 🌙✨<br>May this Eid bring you closer to your dreams and fill your life with divine blessings and happiness.`,
        4: `Eid Mubarak, Lulubhai! 🌙✨<br>May your Eid be filled with the warmth of family, the sweetness of togetherness, and countless blessings.`
    };

    // Message box - FULLY VISIBLE STATE READY
    const messageBox = document.createElement('div');
    messageBox.id = 'golden-message';
    messageBox.innerHTML = `
        <div class="message-content">
            <div style="line-height: 1.6; margin-bottom: 30px; font-size: 1.4rem;">${messages[optionId]}</div>
            <button id="thank-btn-${optionId}" class="thank-you-btn">Thank You ❤️</button>
        </div>
    `;
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
        text-align: center;
        padding: 50px 40px;
        background: linear-gradient(145deg, #1e1b4b, #0f0f23);
        color: #FFD700;
        border: 2px solid #FFD700;
        border-radius: 30px;
        box-shadow: 0 40px 100px rgba(255, 215, 0, 0.4);
        z-index: 3001;
        opacity: 0;
        pointer-events: none;
        backdrop-filter: blur(25px);
        max-width: 650px;
        max-height: 80vh;
        overflow-y: auto;
        font-family: 'Dancing Script', cursive;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
    `;
    document.body.appendChild(messageBox);

    // Thank you button handler - attach immediately
    setTimeout(() => {
        const btn = document.getElementById(`thank-btn-${optionId}`);
        if (btn) {
            btn.onclick = () => showPrivateContent(optionId);
            btn.style.pointerEvents = 'auto';
            messageBox.style.pointerEvents = 'auto';
        }
    }, 100);

    // STEP 1: Lights sweep in (2s)
    Promise.all([
        leftLight.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], { duration: 2000, easing: 'ease-out' }),
        rightLight.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], { duration: 2000, easing: 'ease-out' })
    ]).then(() => {
        // STEP 2: Lights hold 1s, THEN fade (1.2s), THEN message appears
        setTimeout(() => {
            // Fade lights out
            Promise.all([
                leftLight.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], { duration: 1200, easing: 'ease-in' }),
                rightLight.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], { duration: 1200, easing: 'ease-in' })
            ]).then(() => {
                leftLight.remove();
                rightLight.remove();
                
                // STEP 3: Message appears instantly after lights fully fade
                messageBox.style.transition = 'opacity 0.5s ease-out';
                messageBox.style.opacity = '1';
                messageBox.style.pointerEvents = 'auto';
            });
        }, 1000); // 1s hold
    });
}

function showPrivateContent(optionId) {
    const messageBox = document.getElementById('golden-message');
    if (messageBox) {
        messageBox.style.opacity = '0';
        setTimeout(() => {
            if (messageBox) messageBox.remove();
        }, 500);
    }
    document.querySelector('.options-section').style.opacity = '1';
    document.querySelector('.options-section').style.pointerEvents = 'auto';
    
if (optionId === 1) {
        window.open('option1-gallery.html', '_blank');
    } else if (optionId === 2) {
        window.open('option2-gallery.html', '_blank');
    } else if (optionId === 3) {
        window.open('option3-gallery.html', '_blank');
    } else if (optionId === 4) {
        window.open('option4-gallery.html', '_blank');
    } else {
        showOptionContent(optionId);
    }
}

function copyBkashNumber() {
    navigator.clipboard.writeText('01911734185').then(function() {
        alert('bKash number 01911734185 copied to clipboard! 📋');
    }, function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = '01911734185';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('bKash number 01911734185 copied to clipboard! 📋');
    });
}

function showOptionContent(optionId) {
    // Default placeholder content for other options
    const contentOverlay = document.createElement('div');
    contentOverlay.className = 'content-overlay';
    contentOverlay.innerHTML = `
        <div class="content-inner">
            <button class="close-content" onclick="closeContent()">&times;</button>
            <div class="content-placeholder">
                <h2 id="content-name">Option ${optionId}</h2>
                <p>Private content for option ${optionId}. Special photos opened in new tabs!</p>
            </div>
        </div>
    `;
    document.body.appendChild(contentOverlay);
}

