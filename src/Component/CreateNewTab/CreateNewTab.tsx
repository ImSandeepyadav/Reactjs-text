import { Button, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import "./CreateNewTab.css"

interface Operation {
    name: string;
    tool: string;
}


interface Project {
    name: string;
    operations: Operation[];
}

const tools = [
    { label: "Tool D-2", value: "D-2" },
    { label: "Tool D-4", value: "D-4" },
    { label: "Tool D-6", value: "D-6" },
    { label: "Tool D-8", value: "D-8" },
    { label: "Tool D-10", value: "D-10" }
];

function CreateNewTab() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(
        null
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [isAddingOperation, setIsAddingOperation] = useState(false);
    const [newOperationName, setNewOperationName] = useState("");
    const [newOperationTool, setNewOperationTool] = useState("");


    const handleAddProject = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (newProjectName) {
            const newProject: Project = {
                name: newProjectName,
                operations: []
            };
            setProjects([...projects, newProject]);
            setIsModalVisible(false);
            setNewProjectName("");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewProjectName("");
    };

    const handleSelectProject = (index: number) => {
        setSelectedProjectIndex(index);
    };

    const handleCancelAddOperation = () => {
        setIsAddingOperation(false);
        setNewOperationName("");
        setNewOperationTool("");
    };

    const handleSaveOperation = () => {
        if (newOperationName && newOperationTool) {
            const newOperation: Operation = {
                name: newOperationName,
                tool: newOperationTool
            };
            const projectCopy = { ...projects[selectedProjectIndex!] };
            projectCopy.operations.push(newOperation);
            const newProjects = [...projects];
            newProjects[selectedProjectIndex!] = projectCopy;
            setProjects(newProjects);
            handleCancelAddOperation();
        }
    };

    const handleDeleteOperation = (operationIndex: number) => {
        const projectCopy = { ...projects[selectedProjectIndex!] };
        projectCopy.operations.splice(operationIndex, 1);
        const newProjects = [...projects];
        newProjects[selectedProjectIndex!] = projectCopy;
        setProjects(newProjects);
    };

    const handleAddOperation = () => {
        setIsAddingOperation(true);
    };

    return (
        <div className="app-container">
            <div className="projects-container">
                <span className="projects-header">
                    ReactJs Test
                </span>
                <div>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`project-item${selectedProjectIndex === index ? " selected" : ""
                                }`}
                            onClick={() => handleSelectProject(index)}
                        >
                            {project.name}
                        </div>
                    ))}
                </div>
                <div className="add-project-button">
                    <Button className="add-project-item" onClick={handleAddProject}>
                        Create new
                    </Button>
                </div>
                <div>
                    <Modal
                        title="Add New Project"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Input
                            placeholder="Project Name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                        />
                    </Modal>
                </div>
            </div>
            <div className="main-panel-container">
                {selectedProjectIndex === null ? (
                    <div className="no-project-selected">No project selected</div>
                ) : (
                    <>
                        <div className="project-header">
                            {projects[selectedProjectIndex].name}
                        </div>
                        <div className="operations-list">
                            {projects[selectedProjectIndex].operations.map(
                                (operation, index) => (
                                    <div key={index} className="operation-item">
                                        <div className="operation-name">{operation.name}</div>
                                        <div className="operation-item-tool-button">
                                            <div className="operation-tool">{operation.tool}</div>
                                            <div
                                                className="operation-delete-button"
                                                onClick={() => handleDeleteOperation(index)}
                                            >
                                                x
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            {isAddingOperation ? (
                                <>
                                    <div className="add-operation-form">
                                        <h6 className="add-new-opeartion">Add New Opeartion</h6>
                                        <Input
                                            className="input"
                                            type="text"
                                            placeholder="Enter name"
                                            value={newOperationName}
                                            onChange={(e) => setNewOperationName(e.target.value)}
                                        />
                                        <Select
                                            placeholder="Select Tool"
                                            className="add-operation-select"
                                            options={tools}
                                            onChange={(value) => setNewOperationTool(value)}
                                        />
                                        <div className="add-buttons">
                                            <Button className="add-operation-buttons" onClick={handleSaveOperation}>Add</Button>
                                            <Button onClick={handleCancelAddOperation}>Cancel</Button>
                                        </div>
                                    </div></>
                            ) : (
                                <>
                                    <div className="add-operation-button">
                                        <Button onClick={handleAddOperation}>
                                            +
                                        </Button>
                                    </div>
                                    <div>
                                        <span className="new-operation-text">
                                            New Operation
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>

    )
}

export default CreateNewTab