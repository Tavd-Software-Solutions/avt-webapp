import { listAll, post, remove, update } from "./Common";
import { Tags, TagsDto } from "../types/tags.types";
import toast from "react-hot-toast";

const TagsApi = () => {
	const url = "/tags";

	const listAllTags = async (): Promise<Tags[]> => {
		return await listAll(url);
	};

	const postTags = async (obj: TagsDto) => {
		return await post(url, obj).then(() => toast.success("Tag created successfully"));
	};

	const updateTag = async (obj: TagsDto, id: string) => {
		return await update(url, obj, id).then(() =>
			toast.success("Tag updated successfully"),
		);
	};

	const deleteTag = async (id: string) => {
		return await remove(url, id).then(() => toast.success("Tag deleted successfully"));
	};

	return { listAllTags, postTags, updateTag, deleteTag };
};

export default TagsApi;
