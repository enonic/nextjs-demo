import {APP_NAME} from '../_enonicAdapter/utils'
import {CATCH_ALL, ComponentRegistry} from '../_enonicAdapter/ComponentRegistry';
import Person from './views/Person';
import getPerson from './queries/getPerson';
import MainPage from './pages/Main';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import Heading from './parts/Heading';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import {commonQuery, commonVariables} from './queries/common';
import DefaultMacro from './macros/DefaultMacro';
import YoutubeMacro from './macros/YoutubeMacro';


// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
});

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout,
});

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading
});
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList
});

// Macro mappings
ComponentRegistry.addMacro('com.enonic.app.socialmacros:youtube', {
    view: YoutubeMacro
});
ComponentRegistry.addMacro(CATCH_ALL, {
    view: DefaultMacro
});

const textQuery = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      _id
      type
    }
    getSite {
      displayName
      _path
    }
  }
}`;

// Text mappings
ComponentRegistry.addText('/main/1', {
    query: textQuery
});

/*
// Debug
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
*/
