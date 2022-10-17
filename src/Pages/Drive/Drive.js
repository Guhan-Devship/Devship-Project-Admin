import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import request from "../../api/api";
import { useObjectUrl } from "../../useObjectUrl";
import FileSaver from "file-saver";
import CreateFolder from "./CreateFolder";

function Drive() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [finalFiles, setFinalFiles] = useState({ files: [null] });
  const [listData, setListData] = useState([]);
  const [folderData, setFolderData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const onSelectFile = (event) => {
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
      url: `file/upload`,
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
        getdata();
      }
    });
    // FOR BUG IN CHROME
    event.target.value = "";
  };
  console.log(finalFiles);

  let getdata = async () => {
    request({
      url: `getfile`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setListData(res);
      console.log(res);
    });
  };
  let getFolder = async () => {
    request({
      url: `getfolder`,
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
    getdata();
    getFolder();
  }, []);

  let handleDelete = async (id, item) => {
    let value = { files: item };
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteFiles/${id}`,
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
          getdata();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  let handleDeleteFolder = async (id, item) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteFolder/${id}`,
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
          getFolder();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
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

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col">
            <h6 className="overview-heading m-3">Drive</h6>
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
                      onChange={onSelectFile}
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
                {folderData.map((folder) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/viewFolder/${folder._id}`}>
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
                {listData.map((data) => {
                  return data.files.map((e) => {
                    return (
                      <tr>
                        <td>
                          <a
                            href={`http://localhost:2022/${e}`}
                            target="_blank"
                          >
                            {e}
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(data._id, e)}
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
              </tbody>
            </table>
          </div>
        </div>
        {openModal && (
          <CreateFolder setOpen={setOpenModal} getFolder={getFolder} />
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default Drive;
