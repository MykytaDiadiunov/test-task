import BaseLayout from '@/layouts/BaseLayout/BaseLayout'
import BookItem from '@/components/HomePageComponents/BookItem/BookItem'
import BookFilter from '@/components/HomePageComponents/BookItem/BookFilter'
import { useEffect, useState } from 'react'
import { requestService } from '@/services'
import { BookFromListRespose } from '@/models'

function MainPage() {
  const requests = requestService()

  const [books, setBooks] = useState<BookFromListRespose[]>([])

  useEffect(() => {
    requests.getBooks().then((response: BookFromListRespose[]) => {
      setBooks(response)
    })
  }, [])

  function updateBooksByAuthors(selectedAuthorIds: number[]) {
    requests.getBooksByAuthors(selectedAuthorIds).then((response: BookFromListRespose[]) => {
      setBooks(response)
    })
  }

  return (
    <>
      <BaseLayout>
        <div className="content__wrapper d-flex ">
          <div 
            className="filter__wrapper p-1"
            style={{ width: "20%" }}
          >
            <BookFilter filterChange={updateBooksByAuthors}/>
          </div>
          <div 
            className="d-flex flex-wrap justify-content-center align-items-center gap-3 py-3"
            style={{ width: "90%" }}
          >
            {books.map((book: BookFromListRespose) => (
              <div>
                <BookItem  key={book.id} book={book}/>
              </div>
            ))}
          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export default MainPage
