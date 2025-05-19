import React from "react";
import { useAppSelector } from "../hooks";

const CompletedTask = () => {
    const tasks = useAppSelector((state) => 
        state.tasks.filter((tasks) => tasks.completed === true)
    );
    return <h4>Completed tasks: {tasks.length}</h4>
}

export default CompletedTask;