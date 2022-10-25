import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import request from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import FileSaver from "file-saver";
import CreateFolder from "./CreateFolder";
import CreateSubFolder from "./CreateSubFolder";
import Embed from "./Embed";

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
  const [folderData, setFolderData] = useState([]);
  const [subFolderData, setSubFolderData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [pdfId, setPdfId] = useState({});

  const handleClick = () => {
    setOpenModal(true);
  };
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
  let getSubFolder = async () => {
    request({
      url: `getSubFolder/${params.id}`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setSubFolderData(res);
      console.log(res);
    });
  };
  useEffect(() => {
    getFolderFiles();
    getSubFolder();
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

  let handleDelete = async (item) => {
    console.log(item);
    let value = { files: item };
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteFolderFile/${params.id}`,
          method: "POST",
          data: value,
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          if (res.status !== 1) {
            toast.error(res.message, toastOptions);
          }
          if (res.status === 1) {
            toast.success(res.message, toastOptions);
          }
          getFolderFiles();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleDocumentClick = (e) => {
    setPdfId(e);
    setOpenPdf(true);
  };

  let handleDeleteFolder = async (id, item) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteSubFolder/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          if (res.status !== 1) {
            toast.error(res.message, toastOptions);
          }
          if (res.status === 1) {
            toast.success(res.message, toastOptions);
          }
          getSubFolder();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
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
          <div className="m-3 col update-btn ">
            <ul class="nav nav-pills">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-secondary"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  New +
                </a>
                <div class="dropdown-menu">
                  <div className="upload-btn-wrapper">
                    <button
                      class="btn-sm btn-primary mx-2"
                      onClick={handleClick}
                    >
                      New Folder +
                    </button>
                  </div>
                  <div class="upload-btn-wrapper">
                    <button class="btn-sm btn-secondary mx-2">
                      Upload a file
                    </button>
                    <input
                      type="file"
                      name="files"
                      multiple
                      onChange={(event) => onSelectFile(event)}
                    />
                  </div>

                  <div role="separator" class="dropdown-divider"></div>
                </div>
              </li>
            </ul>
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
                {subFolderData.map((folder) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`${folder._id}`}>
                          <i class="fa fa-fw fa-folder"></i>
                          {folder.folder_name}
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteFolder(folder._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {folderData.map((data) => {
                  return data.files.map((e) => {
                    console.log(e.split(".").at(-1));
                    return (
                      <tr>
                        <td>
                          {e.split(".").at(-1) === "jpg" ? (
                            <img
                              src={`http://localhost:2022/${e}`}
                              className="product-image"
                              onClick={() => handleDocumentClick(e)}
                              alt="Preview"
                            />
                          ) : e.split(".").at(-1) === "pdf" ? (
                            <a
                              className="pdf-view"
                              onClick={() => handleDocumentClick(e)}
                            >
                              {e}
                            </a>
                          ) : (
                            <a
                              href={`http://localhost:2022/${e}`}
                              target="_blank"
                            >
                              {e}
                            </a>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(e)}
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
                  });
                })}
                {/* {folderData?.files?.map((e) => {
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
                          onClick={() => handleDelete(e)}
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
                })} */}
              </tbody>
            </table>
          </div>
        </div>
        {openModal && (
          <CreateSubFolder
            setOpen={setOpenModal}
            params={params}
            getSubFolder={getSubFolder}
          />
        )}
        {openPdf && <Embed setOpenPdf={setOpenPdf} pdfId={pdfId} />}
      </div>
    </>
  );
}

export default ViewFolder;
