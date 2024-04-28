import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ConfirmCallback = (isConfirmed: boolean) => void;

export interface ConfirmProps {
  title: string;
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  hideCloseIcon?: boolean;
  cancelButtonOnly?: boolean;
  maxWidth?: string;
  zIndex?: number;
}

export interface ConfirmData extends ConfirmProps {
  callback: ConfirmCallback;
}

export const useConfirmStore = defineStore('confirm', () => {
  const isOpen = ref<boolean>(false);
  const props = ref<ConfirmData | null>(null);

  const openConfirm = (data: ConfirmData): void => {
    props.value = data;
    isOpen.value = true;
  };

  const onClose = (isSubmitted: boolean): void => {
    if (props.value) {
      props.value.callback(isSubmitted);
      // Adjust the interval for the animation
      setTimeout(() => {
        props.value = null;
      }, 200);
    }
    isOpen.value = false;
  };

  return { isOpen, props, openConfirm, onClose };
});

export const openConfirm = (props: ConfirmProps): Promise<boolean> => {
  return new Promise((resolve) => {
    const callback: ConfirmCallback = (isConfirmed) => {
      return resolve(isConfirmed);
    };

    useConfirmStore().openConfirm({ ...props, callback });
  });
};
