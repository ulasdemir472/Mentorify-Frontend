const addWishlist = async ({ user, mentor }) => {
  try {
    const response = await fetch(
      `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentor._id}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Added to wishlist");
      window.location.reload();
      localStorage.setItem("scrollPosition", window.scrollY);
    } else {
      toast.error("Failed to add to wishlist");
    }
  } catch (error) {
    toast.error("Failed to add to wishlist");
  }
};

const removeWishlist = async ({ user, mentor }) => {
  try {
    const response = await fetch(
      `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentor._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Removed from wishlist");
      window.location.reload();
      localStorage.setItem("scrollPosition", window.scrollY);
    } else {
      toast.error("Failed to remove from wishlist");
    }
  } catch (error) {
    toast.error("Failed to remove from wishlist");
  }
};
