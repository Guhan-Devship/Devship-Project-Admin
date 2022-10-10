import React from "react";

function Drive() {
  return (
    <>
      <div className="card m-3">
        <div className="row">
          <div className="col">
            <h6 className="overview-heading m-3">Drive</h6>
          </div>
          <div className="m-3 col update-btn ">
            <button className="btn-primary btn btn-sm">Add New</button>
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
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drive;
