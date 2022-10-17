import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import FileSaver from "file-saver";

function ViewFolder() {
  let params = useParams();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [finalFiles, setFinalFiles] = useState({ files: [null] });
  const [folderData, setFolderData] = useState({});
  const onSelectFile = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray);
    setFinalFiles({ files: selectedFilesArray });
    console.log();

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(imagesArray);
    const formData = new FormData();
    Object.entries({ files: selectedFilesArray }).forEach(([key, value]) => {
      value.map((e) => {
        formData.append(key, e);
      });
    });

    request({
      url: `folderUpload/${params.id}`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      if (res.status !== 1) {
        toast.error(res.message, toastOptions);
      }
      if (res.status === 1) {
        toast.success(res.message, toastOptions);
        getFolderFiles();
      }
    });
    //   FOR BUG IN CHROME
    event.target.value = "";
  };

  let getFolderFiles = async () => {
    request({
      url: `getFolderby/${params.id}`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setFolderData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getFolderFiles();
  }, []);

  const downloadFile = (url) => {
    const fileURL = `http://localhost:2022/${url}`;
    const ext = fileURL.split(".").at(-1);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileURL, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.responseType = "blob";
    xhr.onload = () => {
      const file = new Blob([xhr.response], {
        type: `application/${ext}`,
      });

      FileSaver.saveAs(file, url);
    };
    xhr.send();
  };

  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col">
            <h6 className="overview-heading m-3">
              Drive/{folderData.folder_name}
            </h6>
          </div>
          <div className="upload-btn-wrapper col m-3">
            <button class="btn-sm btn-secondary mx-2">Upload a file</button>
            <input
              type="file"
              name="files"
              multiple
              onChange={(event) => onSelectFile(event)}
            />
          </div>
        </div>
        <hr class="sidebar-divider" />
        <div class="card-body">
          <div class="table-responsive table-scroll">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {folderData?.files?.map((e) => {
                  return (
                    <tr>
                      <td>
                        {" "}
                        <a href={`http://localhost:2022/${e}`} target="_blank">
                          {e}
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          // onClick={() => handleDelete(data._id, e)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success ms-2"
                          onClick={() => downloadFile(e)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewFolder;
