import React from "react";

interface AlertInfoProps {
    title?: string;
    message: string;
};

export const AlertInfo = ({title, message}: AlertInfoProps) => {

    return (
        <div className="pt-4 px-4 flex items-center align-middle">
            <div className="w-full p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg" role="alert">
                <span className="font-medium">{title ? title : "Atenção!"}</span> {message}
            </div>
        </div>
    );
};
