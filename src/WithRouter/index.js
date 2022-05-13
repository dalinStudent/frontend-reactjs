import { useParams, useHistory  } from "react-router-dom"

const WithRouter = ({ Component, ...props }) => {
    const params = useParams();
    return <Component {...props} params={{params}} navigation={useHistory()} />
}

export default WithRouter;