import React from "react";

function ViewSubadmin({ setOpenViewModal, viewData }) {
  return (
    <>
      <div className="reserve">
        <div className="rContainer">
          <button
            className="btn btn-sm btn-danger rounded-circle mx-1"
            onClick={() => setOpenViewModal(false)}
          >
            X
          </button>
          <span>Subadmin Details</span>
          <form>
            <div className="row m-3">
              <div className="col-4">Name :</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={viewData.name}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-4">lastname</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={viewData.last_name}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-4">Role</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={viewData.role}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-4">Access</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={viewData?.access.map((e) => {
                    return e.value;
                  })}
                />
              </div>
            </div>

            <div className="row m-3">
              <div className="col-4">Email</div>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control"
                  value={viewData.email}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewSubadmin;
