import { NgModule } from '@angular/core';
import { ConqcubesSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { EmptyStrPipe } from './pipes/empty-str.pipe';

@NgModule({
  imports: [ConqcubesSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    EmptyStrPipe
  ],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    ConqcubesSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    EmptyStrPipe
  ]
})
export class ConqcubesSharedModule {}
