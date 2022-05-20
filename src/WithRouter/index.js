import React from 'react';
import {useParams, useNavigate} from "react-router-dom"

const WithRouter = ({ Component, ...props }) => {
    const params = useParams();
    return <Component {...props} params={{params}} navigation={useNavigate()} />
}

export default WithRouter;