let highestZ = 1;
class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    touchMoveX = 0;
    touchMoveY = 0;
    currentPaperX = 0;
    currentPaperY = 0;
    init(paper) {
        document.addEventListener('touchstart', (e) => {
            if (e.target === paper) {
                this.holdingPaper = true;
                paper.style.zIndex = highestZ;
                highestZ += 1;
                const touch = e.touches[0];
                this.touchStartX = touch.clientX;
                this.touchStartY = touch.clientY;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (this.holdingPaper) {
                const touch = e.touches[0];
                this.touchMoveX = touch.clientX - this.touchStartX;
                this.touchMoveY = touch.clientY - this.touchStartY;
                this.currentPaperX += this.touchMoveX;
                this.currentPaperY += this.touchMoveY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
                this.touchStartX = touch.clientX;
                this.touchStartY = touch.clientY;
            }
        });

        document.addEventListener('touchend', () => {
            this.holdingPaper = false;
        });
    }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
