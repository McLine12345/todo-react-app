import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function MovieDetail() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = "233838ce34f617364018d2c70d0ea24e";
}