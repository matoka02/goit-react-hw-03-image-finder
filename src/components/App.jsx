import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from '../services/fetchImages';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const inputForSearch = evt.target.elements.inputForSearch;
    const searchValue = inputForSearch.value.trim();
    // console.log(inputForSearch.value);
    if (searchValue === '') {
      return
    };
    this.setState({
      // images: [],
      isLoading: true,
      currentSearch: inputForSearch.value,
      // pageNr: 1,
    },
    // ()=> {
    //   fetchImages(searchValue, 1).then((resp)=>{
    //     this.setState({
    //       images: resp,
    //       isLoading: false
    //     })
    //   })
    // }
    );
  };

  handleClickMore = () => {
    const { currentSearch, pageNr } = this.state;
      this.setState((prevState) => ({
        // images: [],
        // currentSearch: currentSearch,
        isLoading: true,
        pageNr: pageNr + 1,
      }));
    // fetchImages(currentSearch, pageNr + 1).then((resp) => {
    //   this.setState((prevState) => ({
    //     images: [...prevState.images, ...resp],
    //     pageNr: prevState.pageNr + 1,
    //   }));
    // });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.currentSearch);
    // console.log(prevState.currentSearch);
    const { currentSearch, pageNr } = this.state;
    
    if (this.state.currentSearch !== prevState.currentSearch || this.state.pageNr !== prevState.pageNr) {
      this.setState({ isLoading: true });
      fetchImages(this.state.currentSearch, 1).then((response)=>{
        console.log(response.length);

        if (response.length === 0) {
          alert('No images on request');
          // console.log(this.state);
          // this.setState({currentSearch: ''})
          return
        };

        this.setState({
          images: [...this.state.images, ...response],
          isLoading: false,
          // pageNr: pageNr+1,
        });        
      })
    };

  };

  // отклонено
  // handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   this.setState({ isLoading: true });
  //   const inputForSearch = evt.target.elements.inputForSearch;
  //   if (inputForSearch.value.trim() === '') {
  //     return;
  //   }
  //   const response = fetchImages(inputForSearch.value, 1);
  //   this.setState({
  //     images: response,
  //     isLoading: false,
  //     currentSearch: inputForSearch.value,
  //     pageNr: 1,
  //   });
  // };

  // handleClickMore = async () => {
  //   const response = await fetchImages(
  //     this.state.currentSearch,
  //     this.state.pageNr + 1
  //   );
  //   this.setState({
  //     images: [...this.state.images, ...response],
  //     pageNr: this.state.pageNr + 1,
  //   });
  // };  


  handleImageClick = evt => {
    this.setState({
      modalOpen: true,
      modalAlt: evt.target.alt,
      modalImg: evt.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          justifyContent: 'center',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />
        
        {this.state.images.length > 0 && (
              <ImageGallery
                  onImageClick={this.handleImageClick}
                  images={this.state.images}
              />
          )}

        {this.state.images.length > 0 ? (
          <Button onClick={this.handleClickMore} />
        ) : null}

{/* {this.state.images.length < 12 && <Button onClick={this.handleClickMore} />} */}


        {this.state.isLoading && <Loader />}

        {this.state.modalOpen && (
              <Modal
                  src={this.state.modalImg}
                  alt={this.state.modalAlt}
                  handleClose={this.handleModalClose}
              />
          )}
      </div>
    );
  }
}
