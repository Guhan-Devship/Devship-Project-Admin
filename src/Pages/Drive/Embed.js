import React from "react";
import { toast, ToastContainer } from "react-toastify";

function Embed({ setOpenPdf, pdfId }) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  return (
    <div className="pdfView">
      <div className="pdfContainer">
        <button
          id="x"
          className="btn btn-sm rounded-pill        "
          onClick={() => setOpenPdf(false)}
        >
          X
        </button>
        {pdfId.split(".").at(-1) === "pdf" ? (
          <embed
            src={`http://localhost:2022/${pdfId}`}
            width="100%"
            height="500"
          />
        ) : pdfId.split(".").at(-1) === "jpg" ? (
          <img src={`http://localhost:2022/${pdfId}`} alt="Preview" />
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Embed;
