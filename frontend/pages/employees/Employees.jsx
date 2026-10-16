import { useState } from "react";

const addEmployee = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI only: no backend API call
    console.log("Employee form data:", formData);

    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      position: "",
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      position: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Employees
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your organization's employees.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg
                     bg-indigo-600 px-5 py-3 text-sm font-medium text-white
                     shadow-sm transition hover:bg-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     focus:ring-offset-2"
        >
          <span className="text-lg leading-none">+</span>
          Add Employee
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Employees</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-800">
            0
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Employee overview
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Employees</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-800">
            0
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Currently active
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-slate-500">Departments</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-800">
            0
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Across your organization
          </p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-800">
              All Employees
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage employee information.
            </p>
          </div>

          <input
            type="search"
            placeholder="Search employees..."
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5
                       text-sm outline-none transition placeholder:text-slate-400
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                       sm:max-w-xs"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="bg-slate-50">
              <tr>
                {["Employee", "Email", "Position", "Status", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-xs font-semibold uppercase
                                 tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center
                                  rounded-full bg-indigo-50 text-2xl text-indigo-600">
                    ♙
                  </div>

                  <h3 className="mt-4 font-medium text-slate-800">
                    No employees yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Add your first employee to get started.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="mt-5 text-sm font-medium text-indigo-600
                               hover:text-indigo-700"
                  >
                    + Add Employee
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl
                       bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b
                            border-slate-100 px-6 py-5">
              <div>
                <h2
                  id="employee-modal-title"
                  className="text-xl font-semibold text-slate-800"
                >
                  Add Employee
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the employee details below.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="rounded-lg p-2 text-xl leading-none text-slate-400
                           transition hover:bg-slate-100 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3
                             text-sm text-slate-800 outline-none transition
                             placeholder:text-slate-400 focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@example.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3
                             text-sm text-slate-800 outline-none transition
                             placeholder:text-slate-400 focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Position <span className="text-red-500">*</span>
                </label>

                <input
                  id="position"
                  name="position"
                  type="text"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3
                             text-sm text-slate-800 outline-none transition
                             placeholder:text-slate-400 focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t
                              border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-slate-200 px-5 py-2.5
                             text-sm font-medium text-slate-700 transition
                             hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm
                             font-medium text-white shadow-sm transition
                             hover:bg-indigo-700 focus:outline-none
                             focus:ring-2 focus:ring-indigo-500
                             focus:ring-offset-2"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default addEmployee;