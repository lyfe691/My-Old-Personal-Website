(function() {
    setTimeout(() => {
        const host = document.createElement('div');
        const shadow = host.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

                #oldweb-popup {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 20px 24px;
                    border-radius: 20px;
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.08),
                        0 2px 8px rgba(0, 0, 0, 0.02),
                        0 0 1px rgba(0, 0, 0, 0.08);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    transform: translateY(200px);
                    opacity: 0;
                    z-index: 1000;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    width: 380px;
                }

                :host-context(body.dark-mode) #oldweb-popup {
                    background: rgba(28, 28, 32, 0.95);
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.2),
                        0 2px 8px rgba(0, 0, 0, 0.1),
                        0 0 1px rgba(255, 255, 255, 0.1);
                }

                @media (max-width: 480px) {
                    #oldweb-popup {
                        right: 16px;
                        left: 16px;
                        width: auto;
                        bottom: 20px;
                    }
                }

                #oldweb-popup.show {
                    transform: translateY(0);
                    opacity: 1;
                }

                .popup-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .text-content {
                    flex-grow: 1;
                }

                .title {
                    font-size: 15px;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                :host-context(body.dark-mode) .title {
                    color: #ffffff;
                }

                #close-button {
                    position: absolute;
                    top: -12px;
                    right: -12px;
                    width: 28px;
                    height: 28px;
                    border: none;
                    background: rgba(255, 255, 255, 0.98);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    border-radius: 50%;
                    cursor: pointer;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 1001;
                    padding: 0;
                }

                :host-context(body.dark-mode) #close-button {
                    background: rgba(28, 28, 32, 0.95);
                    color: #999;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }

                #close-button:hover {
                    transform: rotate(90deg) scale(1.1);
                    background: #fff;
                    color: #333;
                }

                :host-context(body.dark-mode) #close-button:hover {
                    background: #333;
                    color: #fff;
                }

                #close-button svg {
                    width: 14px;
                    height: 14px;
                    pointer-events: none;
                }

                .view-button {
                    background: #8B5CF6;
                    color: white;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    font-family: inherit;
                    white-space: nowrap;
                    overflow: hidden;
                    position: relative;
                }

                :host-context(body.dark-mode) .view-button {
                    background: #7C3AED;
                }

                .view-button:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        45deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    transform: translateX(-100%);
                    transition: transform 0.6s ease;
                }

                .view-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 
                        0 4px 20px rgba(139, 92, 246, 0.3),
                        0 2px 8px rgba(139, 92, 246, 0.2);
                }

                :host-context(body.dark-mode) .view-button:hover {
                    box-shadow: 
                        0 4px 20px rgba(124, 58, 237, 0.4),
                        0 2px 8px rgba(124, 58, 237, 0.3);
                }

                .view-button:hover:before {
                    transform: translateX(100%);
                }

                .view-button:active {
                    transform: translateY(0);
                }

                .icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(139, 92, 246, 0.1);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                :host-context(body.dark-mode) .icon {
                    background: rgba(124, 58, 237, 0.2);
                }

                #oldweb-popup:hover .icon {
                    transform: translateX(-3px) rotate(-8deg);
                }

                .icon svg {
                    width: 20px;
                    height: 20px;
                    color: #8B5CF6;
                    pointer-events: none;
                }

                :host-context(body.dark-mode) .icon svg {
                    color: #7C3AED;
                }

                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                }
            </style>
            
            <div id="oldweb-popup">
                <button id="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="popup-content">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </div>
                    <div class="text-content">
                        <h3 class="title">View old website?</h3>
                    </div>
                    <button class="view-button">View Old</button>
                </div>
            </div>
        `;

        document.body.appendChild(host);
        
        const popup = shadow.getElementById('oldweb-popup');
        const closeButton = shadow.getElementById('close-button');
        let hideTimeout;
        let isHovered = false;

        setTimeout(() => {
            popup.classList.add('show');
        }, 100);

        function forceClose() {
            isHovered = false;
            popup.style.animation = 'fadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => host.remove(), 400);
        }

        const hidePopup = () => {
            if (!isHovered) {
                popup.style.animation = 'fadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                setTimeout(() => host.remove(), 400);
            }
        };

        const startHideTimer = () => {
            hideTimeout = setTimeout(hidePopup, 8000);
        };

        popup.addEventListener('mouseenter', () => {
            isHovered = true;
            clearTimeout(hideTimeout);
        });

        popup.addEventListener('mouseleave', () => {
            isHovered = false;
            startHideTimer();
        });

        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(hideTimeout);
            forceClose();
        });

        shadow.querySelector('.view-button').addEventListener('click', () => {
            window.location.href = 'https://old.yanissebastianzuercher.ch';
        });

        startHideTimer();

    }, 20000);
})();
