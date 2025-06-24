class Marquee {
    constructor(selector, options = {}) {
        this.marqueeContainer = $(selector);
        this.marqueeWrapper = this.marqueeContainer.find('.marquee-wrapper');

        this.animationDirection = options.animationDirection || 'right';
        this.axis = ['left', 'right'].includes(this.animationDirection) ? 'x' : 'y';

        this.animationSpeed = options.animationSpeed || 1;
        this.originalSpeed = this.animationSpeed;
        this.pauseSpeed = options.pauseSpeed ?? 0.1;

        this.dragSensitivity = options.dragSensitivity || 1;
        this.callbacks = options.on || {};

        this.pauseInterval = options.pauseInterval || null;
        this.pauseDuration = options.pauseDuration || 2000;
        this.pauseCycleTimer = null;
        this.pauseSubTimer = null;
        this.pauseCycleRunning = false;

        this.isDragging = false;
        this.startX = 0;
        this.currentTransform = 0;
        this.animationFrameId = null;
        this.lastTimestamp = null;

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
        const content = this.marqueeWrapper.html();
        this.marqueeWrapper.append(content);
        this.marqueeWrapper.prepend(content);

        const size = this.axis === 'x'
            ? this.marqueeWrapper.width() / 3
            : this.marqueeWrapper.height() / 3;
        this.currentTransform = -size;

        const transformProp = this.axis === 'x' ? 'translateX' : 'translateY';
        this.marqueeWrapper.css('transform', `${transformProp}(${this.currentTransform}px)`);
    }

    startMarqueeAnimation() {
        if (this.pauseInterval) this.setupPauseCycle();

        const animate = (timestamp) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const delta = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            const speed = (delta / 16.67) * this.animationSpeed;
            const directionMultiplier = ['left', 'up'].includes(this.animationDirection) ? -1 : 1;
            this.currentTransform += directionMultiplier * speed;

            const size = this.axis === 'x'
                ? this.marqueeWrapper.width() / 3
                : this.marqueeWrapper.height() / 3;

            if (['right', 'down'].includes(this.animationDirection) && this.currentTransform >= 0) {
                this.currentTransform = -size;
            } else if (['left', 'up'].includes(this.animationDirection) && Math.abs(this.currentTransform) >= size) {
                this.currentTransform = this.currentTransform % size;
            }

            const transformProp = this.axis === 'x' ? 'translateX' : 'translateY';
            this.marqueeWrapper.css('transform', `${transformProp}(${this.currentTransform}px)`);

            this.animationFrameId = requestAnimationFrame(animate);
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    stopMarqueeAnimation() {
        cancelAnimationFrame(this.animationFrameId);
        this.lastTimestamp = null;
        this.clearPauseCycle();
    }

    setupPauseCycle() {
        if (this.pauseCycleRunning) return;
        this.pauseCycleRunning = true;

        const scheduleNextPause = () => {
            this.pauseCycleTimer = setTimeout(() => {
                this.animationSpeed = this.pauseSpeed;
                this.triggerCallback('pauseStart');

                requestAnimationFrame(() => {
                    this.alignToNearestItem();

                    this.pauseSubTimer = setTimeout(() => {
                        this.animationSpeed = this.originalSpeed;
                        this.triggerCallback('pauseEnd');
                        scheduleNextPause();
                    }, this.pauseDuration);
                });
            }, this.pauseInterval);
        };

        this.clearPauseCycle();
        scheduleNextPause();
    }

    alignToNearestItem() {
        const containerRect = this.marqueeContainer[0].getBoundingClientRect();
        const containerCenter = this.axis === 'x'
            ? containerRect.left + containerRect.width / 2
            : containerRect.top + containerRect.height / 2;

        const items = this.marqueeWrapper.children('img, a, span');
        let closest = null;
        let minDist = Infinity;

        items.each((_, el) => {
            const rect = el.getBoundingClientRect();
            const center = this.axis === 'x'
                ? rect.left + rect.width / 2
                : rect.top + rect.height / 2;
            const dist = Math.abs(center - containerCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = { center };
            }
        });

        if (!closest) return;

        const delta = closest.center - containerCenter;
        this.currentTransform -= delta;

        const transformProp = this.axis === 'x' ? 'translateX' : 'translateY';
        this.marqueeWrapper.css('transform', `${transformProp}(${this.currentTransform}px)`);

        this.lastTimestamp = performance.now();
    }

    clearPauseCycle() {
        clearTimeout(this.pauseCycleTimer);
        clearTimeout(this.pauseSubTimer);
        this.pauseCycleTimer = null;
        this.pauseSubTimer = null;
        this.pauseCycleRunning = false;
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
        this.startX = this.axis === 'x' ? e.clientX : e.clientY;
        this.marqueeContainer.css('cursor', 'grabbing');

        this.currentTransform = this.getCurrentTransform();
        this.stopMarqueeAnimation();
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const client = this.axis === 'x' ? e.clientX : e.clientY;
        const delta = (client - this.startX) * this.dragSensitivity;
        this.currentTransform += delta;
        this.normalizeTransform();
        const transformProp = this.axis === 'x' ? 'translateX' : 'translateY';
        this.marqueeWrapper.css('transform', `${transformProp}(${this.currentTransform}px)`);
        this.startX = client;
    }

    onMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.marqueeContainer.removeClass('active');
            this.marqueeContainer.css('cursor', 'grab');
            this.startMarqueeAnimation();
            this.triggerCallback('dragEnd');
        }
    }

    onTouchStart(e) {
        this.isDragging = true;
        this.triggerCallback('dragStart');
        this.startX = this.axis === 'x' ? e.touches[0].clientX : e.touches[0].clientY;
        this.marqueeContainer.css('cursor', 'grabbing');
        this.currentTransform = this.getCurrentTransform();
        this.stopMarqueeAnimation();
    }

    onTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const client = this.axis === 'x' ? e.touches[0].clientX : e.touches[0].clientY;
        const delta = (client - this.startX) * this.dragSensitivity;
        this.currentTransform += delta;
        this.normalizeTransform();
        const transformProp = this.axis === 'x' ? 'translateX' : 'translateY';
        this.marqueeWrapper.css('transform', `${transformProp}(${this.currentTransform}px)`);
        this.startX = client;
    }

    onTouchEnd() {
        if (this.isDragging) {
            this.isDragging = false;
            this.marqueeContainer.removeClass('active');
            this.startMarqueeAnimation();
            this.triggerCallback('dragEnd');
        }
    }

    normalizeTransform() {
        const size = this.axis === 'x'
            ? this.marqueeWrapper.width() / 3
            : this.marqueeWrapper.height() / 3;

        if (this.currentTransform > 0) {
            this.currentTransform = -size + (this.currentTransform % size);
        } else if (Math.abs(this.currentTransform) >= size) {
            this.currentTransform = this.currentTransform % size;
        }
    }

    getCurrentTransform() {
        const transform = getComputedStyle(this.marqueeWrapper[0]).transform;
        if (transform === 'none') return 0;

        const matrix = transform.split(',');
        return this.axis === 'x'
            ? parseFloat(matrix[4])
            : parseFloat(matrix[5]);
    }

    triggerCallback(event, data = null) {
        if (typeof this.callbacks[event] === 'function') {
            this.callbacks[event].call(this, data);
        }
    }
}
