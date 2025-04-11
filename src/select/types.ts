export type SelectOptions = {
  toggleable?: boolean;
  selectable?: boolean | ((el: HTMLElement) => boolean);
  clearPrevious?: boolean;

  willSelect?: () => void;
  onSelect?: () => void;
  reSelect?: () => void;
  unSelect?: (el: HTMLElement) => void;
  didSelect?: () => void;
};
// select: (element: HTMLElement, options?: SelectOptions) => void;
