// @ts-ignore
import classes from './Modal.module.css';
import React, {Fragment} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    onClick: () => void
        children: React.ReactNode;
}

interface BackdropProps {
}

const Backdrop = (props: BackdropProps): JSX.Element => {
    return <div className={classes.backdrop} />
}

interface OverLayProps {
    children: React.ReactNode;
}

const OverLay = ({children}: OverLayProps): JSX.Element => {
    return <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
    </div>;
}

const Modal = ({children}: ModalProps): JSX.Element => {

    const elementById: HTMLElement = document.getElementById('overlay')!;

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop />, elementById)}
        <Backdrop />
        <OverLay>{children}</OverLay>
    </Fragment>
}

export default Modal;