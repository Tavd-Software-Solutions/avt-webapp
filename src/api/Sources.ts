import { listAll, post, remove, update } from "./Common";
import { Sources, SourcesDto } from "../types/sources.types";
import toast from "react-hot-toast";

const SourcesApi = () => {
	const url = "/sources";

	const listSources = async (): Promise<Sources[]> => {
		return await listAll(url);
	};

	const postSource = async (obj: SourcesDto) => {
		return await post(url, obj).then(() => toast.success("Source created successfully"));
	};

	const updateSource = async (obj: SourcesDto, id: string) => {
		return await update(url, obj, id).then(() =>
			toast.success("Source updated successfully"),
		);
	};

	const deleteSource = async (id: string) => {
		return await remove(url, id).then(() => toast.success("Source deleted successfully"));
	};

	return { listSources, postSource, updateSource, deleteSource };
};

export default SourcesApi;
