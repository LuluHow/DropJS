(function(window, undefined) {
    'use strict';

    window.DropJS = function(droppable, dropzone, ondrag, ondrop) {
        DropJS.Utils = {
            dragSrcEl: null,
            droppable: droppable,
            dropzone: dropzone,
            classForOnDrag: ondrag,
            classForEndDrag: ondrop
        };

        this.addListeners();
    };

    DropJS.prototype.handleDragStart = function(e) {
        this.style.opacity = '0.4';

        DropJS.Utils.dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    };

    DropJS.prototype.handleDragOver = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';

        return false;
    };

    DropJS.prototype.handleDragEnter = function(e) {
        this.classList.add('over');
    };

    DropJS.prototype.handleDragLeave = function(e) {
        this.classList.remove('over');
    };

    DropJS.prototype.handleDrop = function(e) {
        var _this = this;

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (DropJS.Utils.dragSrcEl != this) {
            DropJS.Utils.dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    };

    DropJS.prototype.handleDragEnd = function(e) {
        this.style.opacity = '1';

        [].forEach.call(DropJS.Utils.cols, function(col) {
            col.classList.remove('over');
        });
    };

    DropJS.prototype.addListeners = function() {
        var _this = this;

        DropJS.Utils.cols = document.querySelectorAll(DropJS.Utils.droppable);

        [].forEach.call(DropJS.Utils.cols, function(col) {
            col.setAttribute('draggable', true);

            col.addEventListener('dragstart', _this.handleDragStart, false);
            col.addEventListener('dragenter', _this.handleDragEnter, false)
            col.addEventListener('dragover', _this.handleDragOver, false);
            col.addEventListener('dragleave', _this.handleDragLeave, false);
            col.addEventListener('drop', _this.handleDrop, false);
            col.addEventListener('dragend', _this.handleDragEnd, false);
        });
    }
})(window);