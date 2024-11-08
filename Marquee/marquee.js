class Marquee {
    constructor(selector, options = {}) {
        this.marqueeContainer = $(selector);
        this.marqueeWrapper = this.marqueeContainer.find('.marquee-wrapper');
        this.animationSpeed = options.animationSpeed || 1;
        this.animationDirection = options.animationDirection || 'right';
        this.dragSensitivity = options.dragSensitivity || 1;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentTransform = 0;
        this.animationPaused = false;
        this.animationFrameId = null;
        this.lastTimestamp = null;
        this.isVerticalScroll = null;
        this.callbacks = options.on || {};

        this.init();
    }

    init() {
        this.cloneMarquee();
        this.marqueeWrapper.find('img').attr('draggable', 'false');
        this.startMarqueeAnimation();
        this.attachEventHandlers();
        this.triggerCallback('init');
    }

    cloneMarquee() {
        const originalContent = this.marqueeWrapper.html();
        this.marqueeWrapper.append(originalContent);
        this.marqueeWrapper.prepend(originalContent);
        this.currentTransform = -this.marqueeWrapper.width() / 3; // 초기 위치를 가운데로 조정
        this.marqueeWrapper.css('transform', `translateX(${this.currentTransform}px)`);
    }

    startMarqueeAnimation() {
        const animate = (timestamp) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const delta = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            const speed = (delta / 16.67) * this.animationSpeed; // 16.67ms is approximately 60fps

            if (this.animationDirection === 'left') {
                this.currentTransform -= speed;
            } else if (this.animationDirection === 'right') {
                this.currentTransform += speed;
            }

            if (this.animationDirection === 'right' && this.currentTransform >= 0) {
                this.currentTransform = -this.marqueeWrapper.width() / 3;
            } else if (this.animationDirection === 'left' && Math.abs(this.currentTransform) >= this.marqueeWrapper.width() / 3) {
                this.currentTransform = 0;
            }
            this.marqueeWrapper.css('transform', `translateX(${this.currentTransform}px)`);
            this.animationFrameId = requestAnimationFrame(animate);
        };
        this.animationFrameId = requestAnimationFrame(animate);
    }

    stopMarqueeAnimation() {
        cancelAnimationFrame(this.animationFrameId);
        this.lastTimestamp = null;
    }

    attachEventHandlers() {
        this.marqueeContainer.on('mousedown', (e) => this.onMouseDown(e));
        $(document).on('mouseup', () => this.onMouseUp());
        $(document).on('mousemove', (e) => this.onMouseMove(e));

        this.marqueeContainer[0].addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        document.addEventListener('touchend', () => this.onTouchEnd());
        document.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    }

    onMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.triggerCallback('dragStart');
        this.marqueeContainer.addClass('active');
        this.startX = e.clientX;
        this.marqueeContainer.css('cursor', 'grabbing');
        if (!this.animationPaused) {
            this.currentTransform = this.getCurrentTransform();
            this.stopMarqueeAnimation();
            this.animationPaused = true;
        }
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const x = e.clientX;
        const walk = (x - this.startX) * this.dragSensitivity;
        this.currentTransform += walk;
        this.normalizeTransform();
        this.marqueeWrapper.css('transform', `translateX(${this.currentTransform}px)`);
        this.startX = x;
    }

    onMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.marqueeContainer.removeClass('active');
            this.marqueeContainer.css('cursor', 'grab');
            this.startMarqueeAnimation();
            this.animationPaused = false;
            this.triggerCallback('dragEnd');
        }
    }

    onTouchStart(e) {
        this.isDragging = true;
        this.triggerCallback('dragStart');
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.isVerticalScroll = null;
        this.marqueeContainer.css('cursor', 'grabbing');
        if (!this.animationPaused) {
            this.currentTransform = this.getCurrentTransform();
            this.stopMarqueeAnimation();
            this.animationPaused = true;
        }
    }

    onTouchMove(e) {
        if (!this.isDragging) return;

        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        if (this.isVerticalScroll === null) {
            const deltaX = Math.abs(x - this.startX);
            const deltaY = Math.abs(y - this.startY);
            this.isVerticalScroll = deltaY > deltaX;
        }

        if (this.isVerticalScroll) {
            this.onTouchEnd();
            return;
        }

        e.preventDefault();
        const walk = (x - this.startX) * this.dragSensitivity;
        this.currentTransform += walk;
        this.normalizeTransform();
        this.marqueeWrapper.css('transform', `translateX(${this.currentTransform}px)`);
        this.startX = x;
    }

    onTouchEnd() {
        if (this.isDragging) {
            this.isDragging = false;
            this.marqueeContainer.removeClass('active');
            this.startMarqueeAnimation();
            this.animationPaused = false;
            this.triggerCallback('dragEnd');
        }
    }

    normalizeTransform() {
        const maxOffset = this.marqueeWrapper.width() / 3;
        if (this.currentTransform > 0) {
            this.currentTransform = -maxOffset + (this.currentTransform % maxOffset);
        } else if (Math.abs(this.currentTransform) >= maxOffset) {
            this.currentTransform = this.currentTransform % maxOffset;
        }
    }

    getCurrentTransform() {
        const transformMatrix = window.getComputedStyle(this.marqueeWrapper[0]).transform;
        if (transformMatrix !== 'none') {
            return parseFloat(transformMatrix.split(',')[4].trim());
        }
        return 0;
    }

    triggerCallback(eventName) {
        if (this.callbacks && typeof this.callbacks[eventName] === 'function') {
            this.callbacks[eventName].call(this);
        }
    }

    on(eventName, callback) {
        if (typeof callback === 'function') {
            this.callbacks[eventName] = callback;
        }
    }
}
