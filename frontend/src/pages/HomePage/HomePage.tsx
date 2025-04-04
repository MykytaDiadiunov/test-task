import BaseLayout from '../../layouts/BaseLayout/BaseLayout'
import BookItem from '../../components/HomePageComponents/BookItem/BookItem'
import { useEffect, useState } from 'react'
import { requestService } from '../../services'
import { BookFromListRespose } from '../../models'

function MainPage() {
  const requests = requestService()

  const [books, setBooks] = useState<BookFromListRespose[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const data: BookFromListRespose[] = await requests.getBooks()
      setBooks(data)
    }

    fetchBooks()
  }, [])

  return (
    <>
      <BaseLayout>
        <div className="content__wrapper">
          {books.map((book) => (
            <BookItem key={book.id} book={book}/>
          ))}
          
        </div>
      </BaseLayout>
    </>
  )
}

export default MainPage
