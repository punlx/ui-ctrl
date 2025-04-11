import { SelectOptions } from './types';

export const select = (element: HTMLElement) => {
  let selectedElement: HTMLElement | HTMLElement[] | null = null;

  return (options: SelectOptions) => {
    const {
      toggleable = false,
      selectable = true,
      clearPrevious = true,
      willSelect,
      onSelect,
      reSelect,
      unSelect,
      didSelect,
    } = options;

    willSelect?.();

    const isMulti = !clearPrevious;

    const isSelected = Array.isArray(selectedElement)
      ? selectedElement.includes(element)
      : element === selectedElement;

    if (isSelected) {
      reSelect?.();

      if (!toggleable) return;

      // 🔁 toggle off
      element.setAttribute('aria-selected', 'false');
      unSelect?.(element);

      if (Array.isArray(selectedElement)) {
        selectedElement = selectedElement.filter((el) => el !== element);
        if (selectedElement.length === 0) selectedElement = null;
      } else {
        selectedElement = null;
      }

      return;
    }

    // ✅ เช็ก selectable
    const isAllowed = typeof selectable === 'function' ? selectable(element) : selectable !== false;

    if (!isAllowed) return;

    // 🔄 clear ตัวเก่า (เฉพาะกรณี single)
    if (clearPrevious && selectedElement) {
      if (Array.isArray(selectedElement)) {
        for (const el of selectedElement) {
          el.setAttribute('aria-selected', 'false');
          unSelect?.(el);
        }
      } else {
        selectedElement.setAttribute('aria-selected', 'false');
        unSelect?.(selectedElement);
      }
      selectedElement = null;
    }

    // ✅ apply ตัวใหม่
    onSelect?.();
    element.setAttribute('aria-selected', 'true');

    if (isMulti) {
      if (!Array.isArray(selectedElement)) {
        selectedElement = [element];
      } else if (!selectedElement.includes(element)) {
        selectedElement.push(element);
      }
    } else {
      selectedElement = element;
    }

    didSelect?.();
  };
};
