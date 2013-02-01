var PATH = require("path");

function get_projects_directory() {
    return PATH.join(TOPLEVEL_DIR, "PROJECTS");
};

exports.get_projects_directory = get_projects_directory;
