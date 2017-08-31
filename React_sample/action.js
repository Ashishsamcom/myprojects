import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Button,
    Alert,
    ScrollView,
    Navigator,
    Modal,
    PixelRatio,
    BackAndroid,
    ListView,
    Linking,
    AsyncStorage
} from 'react-native';

import Share, { ShareSheet, ShareButton } from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs;
// const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');
// import Modal from 'react-native-root-modal';
import { Container, Content, Row, H1, H2, H3, NBText, Footer, FooterTab, Thumbnail } from 'native-base';
import Communications from 'react-native-communications';
import RNCalendarEvents from 'react-native-calendar-events';
import Moment from 'moment';
import Toast, { DURATION } from 'react-native-easy-toast';
import BackgroundImage from '../BackgroundImage';

import Icon from 'react-native-vector-icons/FontAwesome';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import { AppConst, styles, styleConst } from '../../app.constant';
import RatingList from '../58a2c82a7a382a7bc199ce96/rating_list';
import NotesList from '../58a2c82a7a382a7bc199ce95/note_list';
import Note from '../58a2c82a7a382a7bc199ce95/note';
import Article from '../58a2c82f7a382a7bc199ce99/article';
let isLoading = false;
let ratingValue;
let ratingData;

class actionBar extends React.Component {

    static contextTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            contactModel: false,
            websiteModel: false,
            FormModel: false,
            camModel: false,
            rating: false,
            article: false,
            notesModel: false,
            commentModel: false,
            EstiblshmentInfoModel: false,
            CalanderInfoModel: false,
        };
    }

    convertBase64 = (url, callback) => {
        // Alert.alert(url);

        let imagePath = null;

        RNFetchBlob
            .config({
                fileCache: true
            })
            .fetch('GET', url)
            // the image is now dowloaded to device's storage
            .then((resp) => {
                // the image path you can use it directly with Image component
                imagePath = resp.path()
                return resp.readFile('base64')
            })
            .then((base64Data) => {
                callback(null, 'data:image/png;base64,' + base64Data);
                return true;
            })
    };

    componentWillUnmount() {
        this.setState = {}
    }

    shareContact = (item) => {
        const shareObject = item;
        if (typeof shareObject.share != 'undefined') {
            loaderHandler.showLoader("Loading");
            if (shareObject.share.urlType != "image" && (shareObject.share.url != null && shareObject.share.url != "")) {
                let shareOptions = {
                    title: shareObject.share.title,
                    url: shareObject.share.url,
                    email: shareObject.share.message,
                    contactNo: shareObject.share.message,
                    message: shareObject.share.message,
                    subject: shareObject.share.title// for email 
                };
                loaderHandler.hideLoader();
                share.open(shareOptions);
            }
            else if (shareObject.share.url != null && shareObject.share.url != "") {
                this.convertBase64(shareObject.share.url, function (error, base64Data) {
                    let shareOptions = {
                        title: shareObject.share.title,
                        url: base64Data,
                        email: shareObject.share.message,
                        contactNo: shareObject.share.message,
                        message: shareObject.share.message,
                        subject: shareObject.share.title// for email 
                    };
                    loaderHandler.hideLoader();
                    sahre.open(shareOptions);
                });
            } else {
                let shareOptions = {
                    title: shareObject.share.title,
                    email: shareObject.share.message,
                    contactNo: shareObject.share.message,
                    message: shareObject.share.message,
                    subject: shareObject.share.title// for email 
                };
                loaderHandler.hideLoader();
                Share.open(shareOptions);
            }
        }
    };

    shareItem = (item) => {
        const shareObject = item;
        if (typeof shareObject.share != 'undefined') {
            loaderHandler.showLoader("Loading"); // Show indicator with message 'loading'
            if (shareObject.share.urlType != "image" && (shareObject.share.url != null && shareObject.share.url != "")) {
                let shareOptions = {
                    title: shareObject.share.title,
                    message: shareObject.share.message,
                    url: shareObject.share.url,
                    subject: shareObject.share.title// for email
                };
                loaderHandler.hideLoader();
                Share.open(shareOptions);

            }
            else if (shareObject.share.url != null && shareObject.share.url != "") {
                this.convertBase64(shareObject.share.url, function (error, base64Data) {
                    let shareOptions = {
                        title: shareObject.share.title,
                        message: shareObject.share.message,
                        url: base64Data,
                        subject: shareObject.share.title, // for email
                    };
                    loaderHandler.hideLoader();
                    Share.open(shareOptions);
                });
            } else {
                let shareOptions = {
                    title: shareObject.share.title,
                    message: shareObject.share.message,
                    subject: shareObject.share.title // for email
                };
                loaderHandler.hideLoader();
                Share.open(shareOptions);
            }
        }
    };

    hideRatingModal = () => {

        this.setState({
            rating: false
        });
    };

    hideNoteListModal = () => {
        this.setState({
            notesModel: false
        });
    };

    hideSendInfoModal = () => {
        this.setState({
            commentModel: false
        });
    };

    hideArticleModal = () => {

        this.setState({
            article: false
        });
    };

    renderPage = (page) => {
        // if (page.route == 'Event58a2c82f7a382a7bc199ce99' || 'RoomList') {
        // For back event handling we have to do this patch
        /*       if (page.route == 'RoomList') {
         // Right now dont know so made it in comment
         /!*if (page.data.subCategory) {
         AsyncStorage.setItem('subCategory', JSON.stringify(page.data.subCategory));
         }*!/
         //
         // if (page.data.from_detail && page.data.businessDetail) {
         //     AsyncStorage.setItem('businessDetail', JSON.stringify(page.data.businessDetail));
         // }
         }*/
        if (page.route == 'RoomList' || page.route == 'Articles' || page.route == 'Event58a2c82f7a382a7bc199ce99' || page.route == 'Product' || page.route == 'LoyaltyList' || page.route == 'specialModule' || page.route == 'BusinessDetail58d523492f79a6514d165712') {

            if (__DEV__) {
                console.log(page.route, page.establishmentId, page.establishment, 'ROUTE');
            }
            if (page.establishmentId) {
                AsyncStorage.setItem('estId', JSON.stringify(page.establishmentId));
            }
            if (page.establishment) {
                console.log('Business page', page.establishment);
                AsyncStorage.setItem('businessDetail', JSON.stringify(page.establishment));
            }
        }
        // End patch

        const { navigator } = this.context;
        var title = navigator._getRouteObject(page.route).title;
        if (__DEV__) {
            console.log('Action', page.data);
        }
        navigator.forward(page.route, title, {
            navigator: navigator,
            data: page.data
        });
    };

    openUrl = (url) => {
        if (url.indexOf("http") <= -1 || url.indexOf("https") <= -1) {
            url = "http://" + url
        }
        Communications.web(url);
    };

    iconColor(iconData) {
        if (iconData && iconData.length > 0) {
            return 'black';
        } else {
            return 'rgba(0, 0, 0, 0.5)';
        }
    };

    iconColorForEventArticle(iconData) {
        if (iconData > 0) {
            return 'black';
        } else {
            return 'rgba(0, 0, 0, 0.5)';
        }
    }

    functionSaveEventOnCalander() {
        // Alert.alert("INfo", "Event");
        // var eventData = this.props.eventDetail;
        RNCalendarEvents.authorizeEventStore()
            .then(status => {
                RNCalendarEvents.saveEvent(this.props.event_time.data.eventName, this.props.event_time.data.calanderInfo)
                    .then(id => {
                        Alert.alert("Success", "Event added in your calendar");
                        // handle success
                    })
                    .catch(error => {
                        Alert.alert("Error", error);
                        // handle error
                    });
            })
            .catch(error => {

            });
    }

    getRating = (originalRating) => {

        let ratingValue = originalRating;
        let ratingData = originalRating;
        if (ratingValue > 0 && ratingValue <= 0.5) {
            ratingData = '0';
        } else if (ratingValue > 0.5 && ratingValue <= 1.5) {
            ratingData = '1';
        } else if (ratingValue > 1.5 && ratingValue <= 2.5) {
            ratingData = '2';
        } else if (ratingValue > 2.5 && ratingValue <= 3.5) {
            ratingData = '3';
        } else if (ratingValue > 3.5 && ratingValue <= 4.5) {
            ratingData = '4';
        } else if (ratingValue > 4.5 && ratingValue <= 5) {
            ratingData = '5';
        }
        return ratingData;
    };

    render() {

        let callAction;
        let mapAction;
        let docAction;
        let camAction;
        let urlAction;
        let shareAction;
        let eventAction;
        let articleAction;
        let chatModule;
        let ratingAction;
        let notesAction;
        let sendInfoAction;
        let EstiblshmentInfoAction;
        let CalanderInfoAction;
        let specialAction;
        let loyaltyAction;
        let productAction;
        let businessAction;


        if (typeof this.props.call != "undefined") {

            if (this.props.call.action == 'modal') {
                callAction = <View>
                    <Modal style={[styles.modal]}
                        onRequestClose={() => this.setState({ contactModel: false })}
                        visible={this.state.contactModel}>
                        <BackgroundImage>
                            <View>
                                <ListView
                                    style={styles.container}
                                    enableEmptySections={true}
                                    dataSource={this.ds.cloneWithRows(this.props.call.data)}
                                    renderHeader={() =>
                                        <View style={[styles.mainViewRow]}>
                                            <View style={[styles.modalTitleDiv]}>
                                                <Text style={[styles.modalTitle]}>{"Contact List"}</Text>
                                            </View>
                                            <View style={[styles.modalClose]}>
                                                <Icon onPress={() => this.setState({ contactModel: false })} name="times" style={[styles.modalCloseIcon]} />
                                            </View>
                                        </View>
                                    }
                                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separatorBlueLine} />}

                                    renderRow={(data) =>
                                        <View>
                                            <View style={[styles.mainViewRow]}>

                                                <View style={{ flex: 2, paddingLeft: 20, paddingTop: 10 }}>
                                                    {data.image ? <Image style={[styles.chatRoomIcon]} source={{ uri: AppConst.MainURL + 'image/get/' + data.image + '/?appId=' + AppConst.appId }} /> :
                                                        <Image style={[styles.chatRoomIcon]} source={require('../../img/bg_1.jpg')} />}
                                                </View>
                                                <View style={{ flex: 6 }}>
                                                    <Text style={[styles.modelTextColor, { fontSize: 18, padding: 10 }]}>{data.desc}</Text>
                                                </View>
                                                <View style={{ flex: 3 }}></View>
                                                <View style={{ margin: 5, paddingRight: 30 }}>
                                                    <Icon name="phone" style={[styles.modelTextColor, { fontSize: 25, padding: 10 }]}
                                                        onPress={() => Communications.phonecall(data.mobile, true)} />
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'row', margin: 5 }}>
                                                    <View style={{ flex: 4 }}>
                                                    </View>
                                                    <View style={{ flex: 2, margin: 5 }}>
                                                        <Icon name="envelope" onPress={this.shareItem.bind(this, this.props)} style={[styles.modelTextColor, { fontSize: 25, padding: 10 }]} />
                                                    </View>

                                                    <View style={{ flex: 2, margin: 5 }}>
                                                        <Icon name="share-alt" style={[styles.modelTextColor, { fontSize: 25, padding: 10 }]}
                                                            onPress={this.shareContact.bind(this, this.props)} />
                                                    </View>
                                                    <View style={{ flex: 3 }}>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                />
                            </View>
                        </BackgroundImage>
                    </Modal>
                    {(this.props.call.data && this.props.call.data.length) ?
                        < TouchableWithoutFeedback
                            onPress={() => (this.props.call.data && this.props.call.data.length > 0) ? this.setState({ contactModel: true }) : null}>
                            <Image source={require('../../img/contact.png')}
                                style={[styles.actionIconRevised, { marginTop: 15 }]} />
                        </TouchableWithoutFeedback> :
                        <Image source={require('../../img/contact_un.png')}
                            style={[styles.actionIconRevised, { marginTop: 15 }]} />
                    }
                </View>
            }
            else {
                callAction =
                    (this.props.call.data && this.props.call.data.length) ?
                        <TouchableWithoutFeedback
                            onPress={() => (this.props.call.data && this.props.call.data.length) ? Communications.phonecall(this.props.call.data, true) : null}>
                            <Image source={require('../../img/contact.png')}
                                style={[styles.actionIconRevised, { marginTop: 15 }]} />
                        </TouchableWithoutFeedback> :
                        <Image source={require('../../img/contact_un.png')}
                            style={[styles.actionIconRevised, { marginTop: 15 }]} />

            }

        }

        if (typeof this.props.map != "undefined") {
            let url = 'https://www.google.com/maps?q=loc:' + this.props.map.latitude + ',' + this.props.map.longitude;
            mapAction =
                <TouchableWithoutFeedback onPress={() => Communications.web(url)}>
                    <Image source={require('../../img/navigation.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
        }

        if (typeof this.props.doc != "undefined") {
            if (this.props.doc.action == 'modal') {
                docAction = <View>
                    <Modal style={[styles.modal]}
                        onRequestClose={() => this.setState({ FormModel: false })}
                        visible={this.state.FormModel}>
                        <View>

                            <ListView
                                style={styles.container}
                                enableEmptySections={true}
                                dataSource={this.ds.cloneWithRows(this.props.doc.data)}
                                renderHeader={() =>
                                    <View style={[styles.mainViewRow]}>
                                        <View style={[styles.modalTitleDiv]}>
                                            <Text style={[styles.modalTitle]}>{"Forms"}</Text>
                                        </View>
                                        <View style={[styles.modalClose]}>
                                            <Icon onPress={() => this.setState({ FormModel: false })} name="times" style={[styles.modalCloseIcon]} />
                                        </View>
                                    </View>
                                }
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separatorBlueLine} />}
                                renderRow={(data) =>
                                    <View style={[styles.mainViewRow, { padding: 10 }]}>
                                        <View style={{ flex: 8, flexDirection: 'row' }}>
                                            <Text style={[styles.modelTextColor, { fontSize: 14, padding: 10 }]}>{data.desc}</Text>
                                        </View>
                                        <View style={{ flex: 2, flexDirection: 'row' }}>
                                            <Icon name="file-text-o" style={[styles.modelTextColor, { fontSize: 25, padding: 10 }]} onPress={() => Communications.web(data.url)} />
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                    </Modal>
                    {
                        (this.props.doc.data && this.props.doc.data.length > 0) ?
                            <TouchableWithoutFeedback
                                onPress={() => (this.props.doc.data && this.props.doc.data.length > 0) ? this.setState({ FormModel: true }) : null}>
                                <Image source={require('../../img/documents.png')}

                                    style={[styles.actionIconRevised]} />
                            </TouchableWithoutFeedback>
                            :
                            <Image source={require('../../img/documents_un.png')}
                                style={[styles.actionIconRevised]} />
                    }
                </View>
            } else {
                docAction =
                    (this.props.doc.data && this.props.doc.data.length > 0) ?
                        <TouchableWithoutFeedback
                            onPress={() => (this.props.doc.data && this.props.doc.data.length > 0) ? Communications.web(this.props.doc.data, true) : null}>
                            <Image source={require('../../img/documents.png')}

                                style={[styles.actionIconRevised]} />
                        </TouchableWithoutFeedback>
                        :
                        <Image source={require('../../img/documents_un.png')}
                            style={[styles.actionIconRevised]} />
            }
        }

        if (typeof this.props.cam != "undefined") {
            if (this.props.cam.action == "modal") {
                camAction = <View>
                    <Modal style={[styles.modal]}
                        onRequestClose={() => this.setState({ camModel: false })}
                        visible={this.state.camModel}>
                        <View>
                            <ListView
                                style={styles.container}
                                dataSource={this.ds.cloneWithRows(this.props.cam.data)}
                                enableEmptySections={true}
                                renderHeader={() =>
                                    <View style={[styles.mainViewRow]}>
                                        <View style={[styles.modalTitleDiv]}>
                                            <Text style={[styles.modalTitle]}>{"Gallary"}</Text>
                                        </View>
                                        <View style={[styles.modalClose]}>
                                            <Icon onPress={() => this.setState({ camModel: false })} name="times" style={[styles.modalCloseIcon]} />
                                        </View>
                                    </View>
                                }
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separatorBlueLine} />}
                                renderRow={(data) =>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.openUrl ? Communications.web(this.openUrl) : null}>
                                        <View style={[styles.mainViewRow, { padding: 2 }]}>

                                            <View style={{ flex: 3, flexDirection: 'row' }} >
                                                <Image
                                                    resizeMode={'stretch'}
                                                    style={{ width: styleConst.deviceWidth, height: styleConst.deviceHeight / 2.5 }} source={{ uri: AppConst.MainURL + 'image/get/' + data.image + '/?appId=' + AppConst.appId }} />
                                            </View>
                                            {data.desc ?
                                                <View style={{ flex: 5, flexDirection: 'row' }}>
                                                    <Text style={[styles.modelTextColor, { fontSize: 12, padding: 10 }]}>{data.desc}</Text>
                                                </View> : null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                            />
                        </View>
                    </Modal>
                    {
                        (this.props.cam.data && this.props.cam.data.length > 0) ?
                            <TouchableWithoutFeedback
                                onPress={() => (this.props.cam.data && this.props.cam.data.length > 0) ? this.setState({ camModel: true }) : null}>
                                <Image source={require('../../img/photos.png')}
                                    style={[styles.actionIconRevised]} />
                            </TouchableWithoutFeedback>
                            :
                            <Image source={require('../../img/photos_un.png')}
                                style={[styles.actionIconRevised]} />
                    }

                </View>
            }
            else {
                camAction =
                    (this.props.cam.data && this.props.cam.data.length > 0) ?
                        <TouchableWithoutFeedback
                            onPress={() => (this.props.cam.data && this.props.cam.data.length > 0) ? Communications.web(this.props.cam.data, true) : null}>
                            <Image source={require('../../img/photos.png')}
                                style={[styles.actionIconRevised]} />
                        </TouchableWithoutFeedback>
                        :
                        <Image source={require('../../img/photos_un.png')}
                            style={[styles.actionIconRevised]} />
            }
        }

        if (typeof this.props.url != "undefined") {
            if (this.props.url.action == "modal") {
                urlAction = <View>
                    <Modal style={[styles.modal]}
                        onRequestClose={() => this.setState({ websiteModel: false })}
                        visible={this.state.websiteModel}>
                        <View>
                            <ListView
                                style={styles.container}
                                enableEmptySections={true}
                                dataSource={this.ds.cloneWithRows(this.props.url.data)}
                                renderHeader={() =>
                                    <View style={[styles.mainViewRow]}>
                                        <View style={[styles.modalTitleDiv]}>
                                            <Text style={[styles.modalTitle]}>{"Links"}</Text>
                                        </View>
                                        <View style={[styles.modalClose]}>
                                            <Icon onPress={() => this.setState({ websiteModel: false })} name="times" style={[styles.modalCloseIcon]} />
                                        </View>
                                    </View>
                                }
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separatorBlueLine} />}
                                renderRow={(data) =>
                                    <View style={[styles.mainViewRow, { padding: 10 }]}>
                                        <View style={{ flex: 8, flexDirection: 'row' }}>
                                            <Text style={[styles.modelTextColor, { fontSize: 14, padding: 10 }]}>{data.desc}</Text>
                                        </View>
                                        <View style={{ flex: 2, flexDirection: 'row' }}>
                                            <IonicIcons name="md-link" style={[styles.modelTextColor, { fontSize: 25, padding: 10 }]} onPress={() => Communications.web(data.url)} />
                                            {/*<View style={[styles.button]} >
                                            <Text style={[styles.buttondetailIconColor, { fontSize: 10 }]} onPress={() => Communications.web(data.wwwlink)}>
                                                Open
                                             </Text>
                                        </View>*/}
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                    </Modal>
                    {
                        (this.props.url.data && this.props.url.data.length > 0) ?
                            <TouchableWithoutFeedback
                                onPress={() => (this.props.url.data && this.props.url.data.length > 0) ? this.setState({ websiteModel: true }) : null}>
                                <Image source={require('../../img/websites.png')}
                                    style={[styles.actionIconRevised, { marginTop: 15 }]} />
                            </TouchableWithoutFeedback>
                            :
                            <Image source={require('../../img/grey-websites_un.png')}
                                style={[styles.actionIconRevised, { marginTop: 15 }]} />
                    }
                </View>
            } else {
                urlAction =
                    (this.props.url.data && this.props.url.data.length > 0) ?
                        <TouchableWithoutFeedback
                            onPress={() => (this.props.url.data && this.props.url.data.length > 0) ? this.openUrl(this.props.url.data) : null}>
                            <Image source={require('../../img/websites.png')}
                                style={[styles.actionIconRevised, { marginTop: 15 }]} />
                        </TouchableWithoutFeedback>
                        :
                        <Image source={require('../../img/grey-websites_un.png')}
                            style={[styles.actionIconRevised, { marginTop: 15 }]} />
            }
        }

        if (typeof this.props.share != "undefined") {
            //shareAction = <Icon name="share-alt" onPress={this.shareItem.bind(this, this.props)}
            //    style={[styles.actionIcon, styles.detailIconColor]} />

            shareAction =
                <TouchableWithoutFeedback onPress={this.shareItem.bind(this, this.props)}>
                    <Image source={require('../../img/share.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback >
        }

        if (typeof this.props.event != "undefined") {
            eventAction =
                (this.props.event.data > 0) ?
                    <TouchableWithoutFeedback onPress={(this.props.event.data > 0) ? this.renderPage.bind(this, {
                        route: this.props.event.route,
                        establishmentId: this.props.event.establishmentId,
                        establishment: this.props.event.establishment,
                        data: this.props.event.routeData
                    }) : null}>
                        <Image source={require('../../img/events.png')}
                            style={[styles.actionIconRevised]} />
                    </TouchableWithoutFeedback>
                    :
                    <Image source={require('../../img/events_un.png')}
                        style={[styles.actionIconRevised]} />
        }

        if (typeof this.props.loyalty != "undefined") {

            loyaltyAction = (this.props.loyalty.data > 0) ?
                <TouchableWithoutFeedback onPress={this.renderPage.bind(this, {
                    route: this.props.loyalty.route,
                    establishmentId: this.props.loyalty.establishmentId,
                    establishment: this.props.loyalty.establishment,
                    data: this.props.loyalty.routeData
                })}>
                    <Image source={require('../../img/Loyalty_new.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
                :
                <Image source={require('../../img/Loyalty_un.png')} style={[styles.actionIconRevised]} />
        }

        if (typeof this.props.product != "undefined") {
            productAction = (this.props.product.data > 0) ?
                <TouchableWithoutFeedback onPress={(this.props.product.data > 0) ? this.renderPage.bind(this, {
                    route: this.props.product.route,
                    establishmentId: this.props.product.establishmentId,
                    establishment: this.props.product.establishment,
                    data: this.props.product.routeData
                }) : null}>
                    <Image source={require('../../img/product-shopping-cart.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
                :
                <Image source={require('../../img/product-shopping-cart_un.png')}
                    style={[styles.actionIconRevised]} />

        }

        if (typeof this.props.article != "undefined") {
            articleAction =
                <View style={{ position: 'relative' }}>
                    <Modal style={[styles.modal]}
                        onRequestClose={() => this.setState({ article: false })}
                        visible={this.state.article}>
                        <Article ratingData={this.props.rating.data} data={this.props.article.data}
                            route={this.props.article.route} hideArticleModal={this.hideArticleModal} />
                    </Modal>
                    {
                        (this.props.article.data > 0) ?
                            <TouchableWithoutFeedback onPress={(this.props.article.data > 0) ? this.renderPage.bind(this, {
                                route: 'Articles',
                                establishmentId: this.props.article.establishmentId,
                                establishment: this.props.article.establishment,
                                data: this.props.article.data
                            }) : null}>
                                <Image source={require('../../img/article.png')}
                                    style={[styles.actionIconRevised, { marginTop: 15 }]} />
                            </TouchableWithoutFeedback>
                            :
                            <Image source={require('../../img/article_un.png')}
                                style={[styles.actionIconRevised, { marginTop: 15 }]} />
                    }

                </View>
        }

        if (typeof this.props.chat != "undefined") {
            chatModule =
                (this.props.chat.data > 0) ?
                    <TouchableWithoutFeedback onPress={this.props.chat.data > 0 ? this.renderPage.bind(this, {
                        route: this.props.chat.route,
                        establishmentId: this.props.chat.establishmentId,
                        establishment: this.props.chat.establishment,
                        data: this.props.chat.routeData
                    }) : null}>
                        <Image source={require('../../img/chatroom.png')}
                            style={[styles.actionIconRevised]} />
                    </TouchableWithoutFeedback>
                    :
                    <Image source={require('../../img/chatroom_un.png')}
                        style={[styles.actionIconRevised]} />
        }

        if (typeof this.props.rating != "undefined") {
            ratingAction = <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Modal style={[styles.modal]}
                    onRequestClose={() => this.setState({ rating: false })}
                    visible={this.state.rating}>
                    <RatingList ratingData={this.props.rating.data} hideRatingModal={this.hideRatingModal}
                        establishment={this.props.rating.data.establishment} />
                </Modal>


                <TouchableWithoutFeedback onPress={() => this.setState({ rating: true })}>
                    <Image source={require('../../img/Rating.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>

                {this.props.rating.data.show_count ? <Text
                    style={{
                        position: 'absolute', fontSize: 12, top: 7, paddingLeft: 10, justifyContent: 'center',
                        alignItems: 'center', textAlign: 'center'
                    }}>{this.getRating(this.props.rating.data.avrage_rating)}</Text> : null}
            </View>
        }

        if (typeof this.props.notes != "undefined") {
            notesAction = <View>
                <Modal style={[styles.modal]}
                    onRequestClose={() => this.setState({ notesModel: false })}
                    visible={this.state.notesModel}>
                    <NotesList notesData={this.props.notes.data} hideNoteListModal={this.hideNoteListModal} />
                </Modal>
                <TouchableWithoutFeedback onPress={() => this.setState({ notesModel: true })}>
                    <Image source={require('../../img/notes.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
            </View>
        }

        if (typeof this.props.sendInfo != "undefined") {
            sendInfoAction = <View>
                <Modal style={[styles.modal]}
                    onRequestClose={() => this.setState({ commentModel: false })}
                    visible={this.state.commentModel}>
                    <Note sendInfo={true} hideNoteModal={this.hideSendInfoModal} />
                </Modal>
                <TouchableWithoutFeedback onPress={() => this.setState({ commentModel: true })}>
                    <Image source={require('../../img/call-back.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
            </View>
        }

        if (typeof this.props.info_est != "undefined") {
            EstiblshmentInfoAction = <View >
                <Modal style={[styles.modal]}
                    onRequestClose={() => this.setState({ EstiblshmentInfoModel: false })}
                    visible={this.state.EstiblshmentInfoModel}>
                    <View style={[styles.container, { height: 500 }]}>
                        <View style={[styles.mainViewRow]}>
                            <View style={[styles.modalTitleDiv]}>
                                <Text style={[styles.modalTitle]}>{"Info"}</Text>
                            </View>
                            <View style={[styles.modalClose]}>
                                <Icon onPress={() => this.setState({ EstiblshmentInfoModel: false })} name="times"
                                    style={[styles.modalCloseIcon]} />
                            </View>

                        </View>
                        <View style={{ flex: 8, flexDirection: 'row' }}>
                            {this.props.info_est}
                        </View>
                    </View>
                </Modal>
                {
                    (this.props.info_est) ?
                        <TouchableWithoutFeedback
                            onPress={() => this.props.info_est ? this.setState({ EstiblshmentInfoModel: true }) : null}>
                            <Image source={require('../../img/time.png')}
                                style={[styles.actionIconRevised]} />
                        </TouchableWithoutFeedback>
                        :
                        <Image source={require('../../img/time_un.png')}
                            style={[styles.actionIconRevised]} />
                }
            </View>
        }

        if (typeof this.props.event_time != "undefined") {
            CalanderInfoAction = <View>
                <Modal style={[styles.modal]}
                    onRequestClose={() => this.setState({ CalanderInfoModel: false })}
                    visible={this.state.CalanderInfoModel}>
                    <View style={[styles.container, { height: 500 }]}>
                        <View style={[styles.mainViewRow]}>
                            <View style={[styles.modalTitleDiv]}>
                                <Text style={[styles.modalTitle]}>{"Info"}</Text>
                            </View>
                            <View style={[styles.modalClose]}>
                                <Icon onPress={() => this.setState({ CalanderInfoModel: false })} name="times"
                                    style={[styles.modalCloseIcon]} />
                            </View>

                        </View>
                        <View style={{ flex: 8, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={[styles.menuBg, { flex: 0.7, flexDirection: 'row', padding: 5 }]}>
                                    <View style={{ flex: 5, }}>
                                        <Text
                                            style={[styles.menuTitle, { textAlign: 'left', fontSize: 14, fontWeight: "bold" }]}>Info
                                            Links
                                        </Text>
                                    </View>
                                    <View style={{ flex: 5, }}>
                                        <Text
                                            style={[styles.menuTitle, { textAlign: 'left', fontSize: 14, fontWeight: "bold" }]}>Event
                                            Date</Text>
                                    </View>
                                    <View style={{ flex: 5 }}>
                                        <Text
                                            style={[styles.menuTitle, { textAlign: 'right', alignSelf: 'stretch', fontSize: 14, fontWeight: "bold" }]}>Event
                                            Time</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 8, flexDirection: 'row', padding: 5 }}>
                                    <View style={{ flex: 5, flexDirection: 'row' }}>
                                        <View st>
                                            <Text style={[styles.sysButton, { padding: 5 }]}
                                                onPress={this.functionSaveEventOnCalander.bind(this)}>
                                                Save Event
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 6.5, flexDirection: 'row' }}>
                                        <Text
                                            style={{ textAlign: 'left' }}>{Moment(this.props.event_time.data.calanderInfo.startDate).format('YYYY-MM-DD')}</Text>
                                    </View>
                                    <View style={{ flex: 3.5, flexDirection: 'row' }}>
                                        <Text
                                            style={{ textAlign: 'right', alignSelf: "stretch" }}> {Moment(this.props.event_time.data.calanderInfo.startDate).format('hh:mm A')}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 3, flexDirection: 'row' }}></View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {
                    (this.props.event_time) ?
                        <TouchableWithoutFeedback
                            onPress={() => this.props.event_time ? this.setState({ CalanderInfoModel: true }) : null}>
                            <Image source={require('../../img/time.png')}
                                style={[styles.actionIconRevised]} />
                        </TouchableWithoutFeedback>
                        :
                        <Image source={require('../../img/time_un.png')}
                            style={[styles.actionIconRevised]} />
                }
            </View>
        }

        if (typeof this.props.special != "undefined") {

            specialAction = (this.props.special.data > 0) ?
                <TouchableWithoutFeedback onPress={(this.props.special.data > 0) ? this.renderPage.bind(this, {
                    route: this.props.special.route,
                    establishmentId: this.props.special.establishmentId,
                    establishment: this.props.special.establishment,
                    data: this.props.special.routeData
                }) : null}>
                    <Image source={require('../../img/Specials.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
                :
                <Image source={require('../../img/Specials_un.png')}
                    style={[styles.actionIconRevised]} />
        }


        if (typeof this.props.business != "undefined") {
            businessAction =
                <TouchableWithoutFeedback onPress={this.renderPage.bind(this, {
                    route: this.props.business.route,
                    establishmentId: this.props.business.establishmentId,
                    establishment: this.props.business.establishment,
                    data: this.props.business.routeData
                })}>
                    <Image source={require('../../img/Author.png')}
                        style={[styles.actionIconRevised]} />
                </TouchableWithoutFeedback>
        }
        return (
            //<ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal={true}>
            <View style={[styles.actionMaster, { flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
                <Toast ref="toast" />
                {callAction}
                {mapAction}
                {shareAction}
                {specialAction}
                {eventAction}
                {loyaltyAction}
                {productAction}
                {articleAction}
                {chatModule}
                {urlAction}
                {docAction}
                {camAction}
                {ratingAction}
                {notesAction}
                {EstiblshmentInfoAction}
                {CalanderInfoAction}
                {businessAction}
                {this.props.sendInfo ? sendInfoAction : null}
            </View>
            //</ScrollView>
        );
    };
}

export default actionBar;
