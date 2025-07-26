import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {post, put, get, deleteAxios} from '../../../redux/services/api';
import {rootUrl} from '../../../utilities/constants';
// const queryClient = useQueryClient()

interface payload {
  PageSize: number;
  PageNumber: number;
  locationId: number;
}
const fetchComplains = async (payload: payload) => {
  const {PageNumber, PageSize, locationId} = payload;
  const {data} = await get(
    `${rootUrl}/v1/Complain?PageSize=${PageSize}&PageNumber=${PageNumber}&LocationId=${locationId}`,
  );
  return data;
};

const fetchComplainsById = async (TicketId: number) => {
  const {data} = await get(`${rootUrl}/v1/Complain?TicketId=${TicketId}`);
  return data;
};

const deleteComplain = async (id: number) => {
  const {data} = await deleteAxios(`${rootUrl}/v1/Complain/Delete/${id}`);
  return data;
};
const saveNotes = async (payload: any) => {
  let obj = {
    url: `${rootUrl}/v1/Complain/AddComplainNotes`,
    data: payload,
  };
  const res = await post(obj);
  return res;
};

export const useMutationSaveNotes = () => {
  return useMutation({
    mutationFn: (payload: any) => saveNotes(payload),
  });
};

export const useMutationDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComplain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchComplains']});
    },
  });
};
export const useFtchComplainById = (TicketId: number) => {
  if (TicketId === undefined) return {data: null};
  return useQuery({
    queryKey: ['fetchComplainById'],
    queryFn: () => fetchComplainsById(TicketId),
  });
};
export const useComplain = (payload: payload) => {
  return useQuery({
    queryKey: ['fetchComplains'],
    queryFn: () => fetchComplains(payload),
  });
};

// export default useComplain
