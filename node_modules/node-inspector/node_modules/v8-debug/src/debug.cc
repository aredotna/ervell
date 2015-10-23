#include <nan.h>
#include <v8-debug.h>


using v8::Isolate;
using v8::Handle;
using v8::Local;
using v8::Value;
using v8::Number;
using v8::Integer;
using v8::String;
using v8::Script;
using v8::Object;
using v8::Array;
using v8::Message;
using v8::Context;
using v8::Function;
using v8::FunctionTemplate;
using Nan::To;
using Nan::New;
using Nan::Get;
using Nan::Set;
using Nan::ForceSet;
using Nan::SetMethod;
using Nan::HandleScope;
using Nan::EscapableHandleScope;
using Nan::Undefined;
using Nan::TryCatch;
using Nan::ThrowError;
using Nan::ThrowTypeError;
using Nan::CompileScript;
using Nan::RunScript;
using Nan::MaybeLocal;
using Nan::EmptyString;
using Nan::BoundScript;
using Nan::Utf8String;

namespace nodex {


#define CHK(VALUE)                                                            \
  VALUE.ToLocalChecked()

#define RETURN(VALUE) {                                                       \
  info.GetReturnValue().Set(VALUE);                                           \
  return;                                                                     \
}

#define SET(TARGET, NAME, VALUE)                                              \
  Set(TARGET, CHK(New(NAME)), VALUE)

#define RUNSCRIPT(EXPRESSION, RESULT) while (true) {                          \
    MaybeLocal<BoundScript> script = CompileScript(EXPRESSION);               \
    if (tryCatch.HasCaught()) break;                                          \
    RESULT = Nan::RunScript(CHK(script));                                     \
    break;                                                                    \
  }

#define MAYBE_RETHROW()                                                       \
  if (tryCatch.HasCaught()) {                                                 \
    tryCatch.ReThrow();                                                       \
    return;                                                                   \
  }

  class Debug {
    public:

      static NAN_METHOD(Call) {
        if (info.Length() < 1) {
          return ThrowError("Error");
        }

        Handle<Function> fn = Handle<Function>::Cast(info[0]);
        v8::Debug::Call(fn);

        RETURN(Undefined());
      };

      static NAN_METHOD(SendCommand) {
        String::Value command(info[0]);
#if (NODE_MODULE_VERSION > 0x000B)
        Isolate* debug_isolate = v8::Debug::GetDebugContext()->GetIsolate();
        v8::HandleScope debug_scope(debug_isolate);
        v8::Debug::SendCommand(debug_isolate, *command, command.length());
#else
        v8::Debug::SendCommand(*command, command.length());
#endif
        RETURN(Undefined());
      };

      static NAN_METHOD(RunScript) {
        Local<String> expression = CHK(To<String>(info[0]));

        if (expression.IsEmpty())
          RETURN(Undefined());


        Local<Context> debug_context = v8::Debug::GetDebugContext();
#if (NODE_MODULE_VERSION > 45)
        if (debug_context.IsEmpty()) {
          // Force-load the debug context.
          v8::Debug::GetMirror(info.GetIsolate()->GetCurrentContext(), info[0]);
          debug_context = v8::Debug::GetDebugContext();
        }
#endif

        Context::Scope context_scope(debug_context);

        TryCatch tryCatch;
        MaybeLocal<Value> result;
        RUNSCRIPT(expression, result);
        MAYBE_RETHROW();
        RETURN(CHK(result));
      };

      static NAN_METHOD(AllowNatives) {
        const char allow_natives_syntax[] = "--allow_natives_syntax";
        v8::V8::SetFlagsFromString(allow_natives_syntax, sizeof(allow_natives_syntax) - 1);

        RETURN(Undefined());
      }

      static Handle<Object> createExceptionDetails(Handle<Message> message) {
        EscapableHandleScope scope;

        Local<Object> exceptionDetails = New<Object>();
        SET(exceptionDetails, "text", message->Get());

#if (NODE_MODULE_VERSION > 0x000E)
        SET(exceptionDetails, "url", message->GetScriptOrigin().ResourceName());
        SET(exceptionDetails, "scriptId", New<Integer>((int32_t)message->GetScriptOrigin().ScriptID()->Value()));
#else
        SET(exceptionDetails, "url", message->GetScriptResourceName());
#endif
        SET(exceptionDetails, "line", New<Integer>(message->GetLineNumber()));
        SET(exceptionDetails, "column", New<Number>(message->GetStartColumn()));

        if (!message->GetStackTrace().IsEmpty())
          SET(exceptionDetails, "stackTrace", message->GetStackTrace()->AsArray());
        else
          SET(exceptionDetails, "stackTrace", Undefined());

        return scope.Escape(exceptionDetails);
      };

      static NAN_METHOD(EvaluateWithExceptionDetails) {
        if (info.Length() < 1)
          return ThrowError("One argument expected.");

        Local<Object> wrappedResult = New<Object>();
        Local<String> expression = CHK(To<String>(info[0]));
        if (expression.IsEmpty())
          return ThrowTypeError("The argument must be a string.");

        TryCatch tryCatch;
        MaybeLocal<Value> result;
        RUNSCRIPT(expression, result);

        if (tryCatch.HasCaught()) {
          SET(wrappedResult, "result", tryCatch.Exception());
          SET(wrappedResult, "exceptionDetails", createExceptionDetails(tryCatch.Message()));
        } else {
          SET(wrappedResult, "result", CHK(result));
          SET(wrappedResult, "exceptionDetails", Undefined());
        }

        RETURN(wrappedResult);
      };

      static NAN_METHOD(SetNonEnumProperty) {
        if (info.Length() < 3)
          return ThrowError("Three arguments expected.");
        if (!info[0]->IsObject())
          return ThrowTypeError("Argument 0 must be an object.");
        if (!info[1]->IsString())
          return ThrowTypeError("Argument 1 must be a string.");

        Local<Object> object = CHK(To<Object>(info[0]));
        ForceSet(object, info[1], info[2], v8::DontEnum);

        RETURN(Undefined());
      };

      static NAN_METHOD(Subtype) {
        if (info.Length() < 1)
          return ThrowError("One argument expected.");

        Handle<Value> value = info[0];
        if (value->IsArray())
          RETURN(CHK(New("array")));
#if (NODE_MODULE_VERSION > 0x000B)
        if (value->IsTypedArray())
          RETURN(CHK(New("array")));
#endif
        if (value->IsDate())
          RETURN(CHK(New("date")));

        if (value->IsRegExp())
          RETURN(CHK(New("regexp")));

        if (value->IsNativeError())
          RETURN(CHK(New("error")));
#if (NODE_MODULE_VERSION > 0x000E)
        if (value->IsArgumentsObject())
          RETURN(CHK(New("array")));

        if (value->IsMap() || value->IsWeakMap())
          RETURN(CHK(New("map")));

        if (value->IsSet() || value->IsWeakSet())
          RETURN(CHK(New("set")));

        if (value->IsMapIterator() || value->IsSetIterator())
          RETURN(CHK(New("iterator")));
#endif
        RETURN(Undefined());
      };

      static Local<String> functionDisplayName(Handle<Function> function) {
        EscapableHandleScope scope;

        Local<String> value;
#if (NODE_MODULE_VERSION > 0x000B)
        value = CHK(To<String>(function->GetDisplayName()));
        if (value->Length())
          return scope.Escape(value);

        value = CHK(To<String>(function->GetName()));
        if (value->Length())
          return scope.Escape(value);

        value = CHK(To<String>(function->GetInferredName()));
        if (value->Length())
          return scope.Escape(value);
#else
        value = function->GetName()->ToString();
        if (value->Length())
          return scope.Escape(value);

        value = function->GetInferredName()->ToString();
        if (value->Length())
          return scope.Escape(value);
#endif

        return scope.Escape(EmptyString());
      };

      static NAN_METHOD(InternalConstructorName) {
        if (info.Length() < 1)
          return ThrowError("One argument expected.");
        if (!info[0]->IsObject())
          return ThrowTypeError("The argument must be an object.");

        Local<Object> object = CHK(To<Object>(info[0]));
        Local<String> result = object->GetConstructorName();

        const char* result_type;
        if (result.IsEmpty() || result->IsNull() || result->IsUndefined())
          result_type = "";
        else
          result_type = *Utf8String(info[0]);

        if (!result.IsEmpty() && strcmp(result_type, "Object") == 0) {
          Local<String> constructorSymbol = CHK(New("constructor"));
          if (object->HasRealNamedProperty(constructorSymbol) && !object->HasRealNamedCallbackProperty(constructorSymbol)) {
            TryCatch tryCatch;
            Local<Value> constructor = object->GetRealNamedProperty(constructorSymbol);
            if (!constructor.IsEmpty() && constructor->IsFunction()) {
              Local<String> constructorName = functionDisplayName(Handle<Function>::Cast(constructor));
              if (!constructorName.IsEmpty() && !tryCatch.HasCaught())
                result = constructorName;
            }
          }
          if (strcmp(result_type, "Object") == 0 && object->IsFunction())
            result = CHK(New("Function"));
        }

        RETURN(result);
      }

      static NAN_METHOD(FunctionDetailsWithoutScopes) {
        if (info.Length() < 1)
          return ThrowError("One argument expected.");

        if (!info[0]->IsFunction())
          return ThrowTypeError("The argument must be a function.");

        Handle<Function> function = Handle<Function>::Cast(info[0]);
        int32_t lineNumber = function->GetScriptLineNumber();
        int32_t columnNumber = function->GetScriptColumnNumber();

        Local<Object> location = New<Object>();
        SET(location, "lineNumber", New(lineNumber));
        SET(location, "columnNumber", New(columnNumber));
#if (NODE_MODULE_VERSION > 0x000B)
        SET(location, "scriptId", CHK(To<String>(New(function->ScriptId()))));
#else
        SET(location, "scriptId", CHK(To<String>(New(function->GetScriptId()->ToInt32()->Value()))));
#endif
        Local<Object> result = New<Object>();
        SET(result, "location", location);

        Handle<String> name = functionDisplayName(function);
        SET(result, "functionName", name.IsEmpty() ? EmptyString() : name);

        RETURN(result);
      }

      static NAN_METHOD(CallFunction) {
        if (info.Length() < 2 || info.Length() > 3)
          return ThrowError("Two or three arguments expected.");
        if (!info[0]->IsFunction())
          return ThrowTypeError("Argument 0 must be a function.");

        Handle<Function> function = Handle<Function>::Cast(info[0]);
#if (NODE_MODULE_VERSION > 0x000B)
        Handle<Value> receiver = info[1];
#else
        Handle<Object> receiver = CHK(To<Object>(info[1]));
#endif

        TryCatch tryCatch;
        MaybeLocal<Value> result;

        if (info.Length() < 3 || info[2]->IsUndefined()) {
          result = function->Call(receiver, 0, NULL);
          MAYBE_RETHROW();
          RETURN(CHK(result));
        }

        if (!info[2]->IsArray())
          return ThrowTypeError("Argument 2 must be an array.");

        Handle<Array> arguments = Handle<Array>::Cast(info[2]);
        int argc = arguments->Length();
        Handle<Value> *argv = new Handle<Value>[argc];
        for (int i = 0; i < argc; ++i)
          argv[i] = CHK(Get(arguments, i));

        result = function->Call(receiver, argc, argv);
        delete [] argv;

        MAYBE_RETHROW();
        RETURN(CHK(result));
      };

      static NAN_METHOD(Eval) {
        if (info.Length() < 1)
          return ThrowError("One argument expected.");

        Local<String> expression = info[0]->ToString();
        if (expression.IsEmpty())
          return ThrowTypeError("The argument must be a string.");

        TryCatch tryCatch;
        MaybeLocal<Value> result;
        RUNSCRIPT(expression, result);
        MAYBE_RETHROW();

        RETURN(CHK(result));
      };

    private:
      Debug() {}
      ~Debug() {}
  };

  NAN_MODULE_INIT(Initialize) {
    HandleScope scope;

    Local<Object> InjectedScriptHost = New<Object>();
    SetMethod(InjectedScriptHost, "eval", Debug::Eval);
    SetMethod(InjectedScriptHost, "evaluateWithExceptionDetails", Debug::EvaluateWithExceptionDetails);
    SetMethod(InjectedScriptHost, "setNonEnumProperty", Debug::SetNonEnumProperty);
    SetMethod(InjectedScriptHost, "subtype", Debug::Subtype);
    SetMethod(InjectedScriptHost, "internalConstructorName", Debug::InternalConstructorName);
    SetMethod(InjectedScriptHost, "functionDetailsWithoutScopes", Debug::FunctionDetailsWithoutScopes);
    SetMethod(InjectedScriptHost, "callFunction", Debug::CallFunction);

    SetMethod(target, "call", Debug::Call);
    SetMethod(target, "sendCommand", Debug::SendCommand);
    SetMethod(target, "runScript", Debug::RunScript);
    SetMethod(target, "allowNatives", Debug::AllowNatives);
    SET(target, "InjectedScriptHost", InjectedScriptHost);
  }

  NODE_MODULE(debug, Initialize)
}
