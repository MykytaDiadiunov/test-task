import { NO_IMAGE_IMAGE_URL } from "@/constants";
import BaseLayout from "@/layouts/BaseLayout/BaseLayout"
import ProtectedRoute from "@/layouts/ProtectedRoute/ProtectedRoute";
import { SingleBookResponse } from "@/models";
import { routes } from "@/router";
import { requestService } from "@/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";


function BookDetailsPage() {
  const requsets = requestService()
  const navigate = useNavigate()

  const [currentBook, setCurrentBook] = useState<SingleBookResponse>()

  const bookId = useParams().id

  useEffect(() => {
    requsets.getBookById(Number(bookId)).then((response: SingleBookResponse) => {
      setCurrentBook(response)
    })
  }, [])

  function editNavigateHandler() {
    navigate(`/edit/book/${bookId}`)
  }

  async function deleteHandler() {
    await requsets.deleteBook(Number(bookId))
    navigate(routes.home.path)
  }

  return (
    <>
      <ProtectedRoute>
        <BaseLayout>
          <div className="d-flex p-4 " >
            <div className="image" style={{marginRight: "15px"}}>
                <img 
                  src={currentBook?.image ? currentBook?.image : NO_IMAGE_IMAGE_URL} 
                  alt="book_image" 
                  style={{width: "230px", height: "280px",}}
                />
            </div>
            <div className="text__content overflow-auto">
              <div className="name mb-3">
                {currentBook?.name}
              </div>
              <div className="author mb-1">
                {currentBook?.author_object.name}
              </div>
              <div className="description mb-3">
                {currentBook?.description}
              </div>
              <Button 
                color="danger"
                style={{marginRight: "10px"}}
                onClick={deleteHandler}
              >
                Delete
              </Button>
              <Button 
                color="warning"
                onClick={editNavigateHandler}
              >
                Edit
              </Button>
            </div>
          </div>
        </BaseLayout>
      </ProtectedRoute>
    </>
  )
}

export default BookDetailsPage