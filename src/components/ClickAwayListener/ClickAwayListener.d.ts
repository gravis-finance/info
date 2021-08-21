import React from 'react';
declare type Props = {
    onClickAway?: (event: React.MouseEvent<Document>) => void;
    mouseEvent?: 'onClick' | 'onMouseDown';
    children: any;
};
export declare const ClickAwayListener: React.FC<Props>;
export {};
