

const spinner = (props) => {

    return <>
        <span className="lds-hourglass" />
        <style jsx>{`
            .lds-hourglass {
                display: inline-block;
                position: relative;
                width: 64px;
                height: 64px;
            }
            .lds-hourglass:after {
                content: " ";
                display: block;
                border-radius: 50%;
                width: 0;
                height: 0;
                margin: 6px;
                box-sizing: border-box;
                border: 26px solid #000;
                border-color: #000 transparent #000 transparent;
                animation: lds-hourglass 1.2s infinite;
            }
            @keyframes lds-hourglass {
                0% {
                transform: rotate(0);
                animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
                }
                50% {
                transform: rotate(400deg);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                }
                100% {
                transform: rotate(1800deg);
                }
            }      
        `}</style>
    </>
};

export default spinner;