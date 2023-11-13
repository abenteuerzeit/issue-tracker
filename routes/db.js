const projects = {};

const getIssues = (project, filters = {}) => {
    if (!projects[project]) {
        projects[project] = [];
    }

    let filteredIssues = projects[project];

    for (let key in filters) {
        filteredIssues = filteredIssues.filter(issue => issue[key] == filters[key]);
    }

    return filteredIssues;
};

const createIssue = (project, createData) => {
    const generateObjectId = () => {
        const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
        const objectId =
            timestamp +
            "xxxxxxxxxxxxxxxx"
                .replace(/[x]/g, () => {
                    return ((Math.random() * 16) | 0).toString(16);
                })
                .toLowerCase();

        return objectId;
    };

    if (!projects[project]) {
        projects[project] = [];
    }

    const {
        issue_title,
        issue_text,
        created_by,
        assigned_to = "",
        status_text = ""
    } = createData;

    const newIssue = {
        _id: generateObjectId(),
        issue_title,
        issue_text,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        created_by,
        assigned_to,
        open: true,
        status_text
    };

    projects[project].push(newIssue);
    return newIssue;
};


const updateIssue = (project, updateData) => {
    if (!projects[project] || !updateData._id) {
        return { error: 'No issue found with _id', _id: updateData._id };
    }

    const issueIndex = projects[project].findIndex(issue => issue._id === updateData._id);
    if (issueIndex === -1) {
        return { error: 'could not update', _id: updateData._id };
    }

    for (let key in updateData) {
        if (updateData[key] && projects[project][issueIndex].hasOwnProperty(key)) {
            projects[project][issueIndex][key] = updateData[key];
        }
    }

    projects[project][issueIndex].updated_on = new Date().toISOString();

    return { result: 'successfully updated', _id: updateData._id };
};

const deleteIssue = (project, _id) => {
    if (!projects[project]) {
        return { error: 'No issue found with _id', _id };
    }

    const issueIndex = projects[project].findIndex(issue => issue._id === _id);
    if (issueIndex === -1) {
        return { error: 'No issue found with _id', _id };
    }

    projects[project].splice(issueIndex, 1);
    return { result: 'successfully deleted', _id };
};

const logError = (message, error) => {
    console.error(message, error);
};

const logInfo = (message) => {
    console.log(message);
};

module.exports = {
    createIssue: (project, createData) => {
        try {
            const newIssue = createIssue(project, createData);
            logInfo('Issue created successfully', newIssue);
            return newIssue;
        } catch (error) {
            logError('Error creating issue', error);
            throw error;
        }
    },
    getIssues: (project, filters) => {
        try {
            const issues = getIssues(project, filters);
            logInfo('Issues retrieved successfully', issues);
            return issues;

        } catch (error) {
            logError('Error retrieving issues', error);
            throw error;
        }
    },
    updateIssue: (project, updateData) => {
        try {
            const result = updateIssue(project, updateData);
            if (result.error) {
                logError('Error updating issue', result.error);
            } else {
                logInfo('Issue updated successfully', result.result);
            }
            return result;
        } catch (error) {
            logError('Error updating issue', error);
            throw error;
        }
    },
    deleteIssue: (project, _id) => {
        try {
            const result = deleteIssue(project, _id);
            if (result.error) {
                logError('Error deleting issue', result.error);
            } else {
                logInfo('Issue deleted successfully', result.result);
            }
            return result;
        } catch (error) {
            logError('Error deleting issue', error);
            throw error;
        }
    }
};
