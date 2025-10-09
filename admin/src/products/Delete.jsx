import { deleteData } from '../routes/route';

const Delete = ({ id }) => {
  const getToken = () => localStorage.getItem('token');
  const handleClick = async () => {
    const confirmDelete = confirm('Anda Ingin menghapus Product ini?');
    if (confirmDelete) {
      await deleteData('api/products/v1', id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="btn btn-warning" onClick={handleClick}>
      Hapus
    </div>
  );
};

export default Delete;
