import { ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getSongs = () => {
  const pathReference = ref(storage, "songs");

  return pathReference;
};

export const useGetSongs = () => {
  return useQuery({ queryKey: ["songs"], queryFn: () => getSongs() });
};
