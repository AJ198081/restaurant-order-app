// @ts-ignore
import classes from './Modal.module.css';
import React, {Fragment} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    onClose: () => void
        children: React.ReactNode;
}

interface BackdropProps {
    onClose: () => void
    // children: React.ReactNode;
}

const Backdrop = ({ onClose}: BackdropProps): JSX.Element => {
    return <div onClick={onClose} className={classes.backdrop} />
}

interface OverLayProps {
    children: React.ReactNode;
}

const OverLay = ({children}: OverLayProps): JSX.Element => {
    return <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
    </div>;
}

const Modal = ({onClose, children}: ModalProps): JSX.Element => {

    const elementById: HTMLElement = document.getElementById('overlay')!;

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={onClose}/>, elementById)}
        {/*<Backdrop />*/}
        <OverLay>{children}</OverLay>
    </Fragment>
}

export default Modal;