import React from "react";
import { ModalBottom } from "./ModalBottom";
import { ModalHeader } from "./ModalHeader";

 interface ModalCustomProps {
    title?: string;
    children: JSX.Element;
    setShowModal: (show: boolean) => void;
    confirmFunction: () => void;
    setLoading?: (loading: boolean) => void;
 };

export const ModalCustom = (
    {
        title,
        children,
        setShowModal,
        setLoading,
        confirmFunction
    }:ModalCustomProps) => {

    return(
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <ModalHeader title={title} setShowModal={setShowModal} />

                        {/*body*/}
                        {children}

                        {/*footer*/}
                        <ModalBottom setShowModal={setShowModal} setLoading={setLoading} confirmFunction={confirmFunction} />
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );

};
