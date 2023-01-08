import {Box, CircularProgress} from "@mui/material";
import {Downloading} from "@mui/icons-material";
import {useAppSelector} from "../app/hooks";
import {selectLoadingState} from "../reducers/loadingSlice";

export default function Loader() {
    const loading = useAppSelector(selectLoadingState);
    return loading?<Box className="loader"><CircularProgress /></Box>:null
}