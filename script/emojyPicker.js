import { createPicker } from 'https://unpkg.com/picmo@latest/dist/index.js';


class EmojyPicker {
    constructor() {
        this.show();
    }

    show() {
        const container = document.querySelector('.emojyPickerContainer');
        const picker = createPicker({
            rootElement: container,
            emojisPerRow: 9,
            visibleRows: 5,
            emojiSize: "1.5rem",
            showCategoryTabs: false,

        });

        picker.addEventListener('emoji:select', event => {
            console.log('Emoji selected:', event.emoji);
        });
    }
}

export { EmojyPicker }

// new EmojyPicker().show()
