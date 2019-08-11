const loader = (propd) => (
    <div className="lds-ripple">
        <div>
        </div>
        <div></div>
        <style jsx>{`
        .lds-ripple {
          display: inline-block;
          position: absolute;
          width: 128px;
          height: 128px;
        }
        .lds-ripple div {
          position: absolute;
          border: 8px solid #000;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 56px;
            left: 56px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: -1px;
            left: -1px;
            width: 116px;
            height: 116px;
            opacity: 0;
          }
        }
        
      `}</style>
    </div>
);

export default loader;